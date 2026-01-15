import { JobRepository } from '@/core/job/domain/repositories/JobRepository';
import { CandidateRepository } from '../../domain/repositories/CandidateRepository';
import { ApplicationRepository } from '../../domain/repositories/ApplicationRepository';
import { ApplyToJobInputDTO, ApplicationDTO } from '../dtos/ApplicationDTO';
import { mapApplicationToDTO } from '../mappers/ApplicationMapper';

export interface ApplyToJobUseCaseDeps {
  candidateRepository: CandidateRepository;
  applicationRepository: ApplicationRepository;
  jobRepository: JobRepository;
}

export class ApplicationError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export async function applyToJobUseCase(
  deps: ApplyToJobUseCaseDeps,
  input: ApplyToJobInputDTO
): Promise<ApplicationDTO> {
  const candidate = await deps.candidateRepository.findById(input.candidateId);
  if (!candidate) {
    throw new ApplicationError('Candidate not found', 'CANDIDATE_NOT_FOUND');
  }

  const job = await deps.jobRepository.findById(input.jobId);
  if (!job) {
    throw new ApplicationError('Job not found', 'JOB_NOT_FOUND');
  }

  if (job.isExpired()) {
    throw new ApplicationError('Cannot apply to an expired job', 'JOB_EXPIRED');
  }

  const existingApplication = await deps.applicationRepository.findByCandidateAndJob(
    input.candidateId,
    input.jobId
  );
  if (existingApplication) {
    throw new ApplicationError('You have already applied to this job', 'ALREADY_APPLIED');
  }

  const application = await deps.applicationRepository.create({
    candidateId: input.candidateId,
    jobId: input.jobId,
    coverLetter: input.coverLetter,
    resumeUrl: input.resumeUrl,
  });

  return mapApplicationToDTO(application);
}
