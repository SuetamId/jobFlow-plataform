import { JobRepository } from '@/core/job/domain/repositories/JobRepository';
import { CandidateRepository } from '../../domain/repositories/CandidateRepository';
import { SavedJobRepository } from '../../domain/repositories/SavedJobRepository';
import { SaveJobInputDTO, SavedJobDTO } from '../dtos/SavedJobDTO';
import { mapSavedJobToDTO } from '../mappers/SavedJobMapper';

export interface SaveJobUseCaseDeps {
  candidateRepository: CandidateRepository;
  savedJobRepository: SavedJobRepository;
  jobRepository: JobRepository;
}

export class SaveJobError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'SaveJobError';
  }
}

export async function saveJobUseCase(
  deps: SaveJobUseCaseDeps,
  input: SaveJobInputDTO
): Promise<SavedJobDTO> {
  const candidate = await deps.candidateRepository.findById(input.candidateId);
  if (!candidate) {
    throw new SaveJobError('Candidate not found', 'CANDIDATE_NOT_FOUND');
  }

  const job = await deps.jobRepository.findById(input.jobId);
  if (!job) {
    throw new SaveJobError('Job not found', 'JOB_NOT_FOUND');
  }

  const existingSavedJob = await deps.savedJobRepository.findByCandidateAndJob(
    input.candidateId,
    input.jobId
  );
  if (existingSavedJob) {
    throw new SaveJobError('Job is already saved', 'ALREADY_SAVED');
  }

  const savedJob = await deps.savedJobRepository.save(
    input.candidateId,
    input.jobId,
    input.notes
  );

  return mapSavedJobToDTO(savedJob);
}

export async function unsaveJobUseCase(
  deps: SaveJobUseCaseDeps,
  candidateId: string,
  jobId: string
): Promise<void> {
  const candidate = await deps.candidateRepository.findById(candidateId);
  if (!candidate) {
    throw new SaveJobError('Candidate not found', 'CANDIDATE_NOT_FOUND');
  }

  const existingSavedJob = await deps.savedJobRepository.findByCandidateAndJob(candidateId, jobId);
  if (!existingSavedJob) {
    throw new SaveJobError('Job is not saved', 'NOT_SAVED');
  }

  await deps.savedJobRepository.remove(candidateId, jobId);
}

export async function isJobSavedUseCase(
  deps: SaveJobUseCaseDeps,
  candidateId: string,
  jobId: string
): Promise<boolean> {
  return deps.savedJobRepository.isSaved(candidateId, jobId);
}
