import { ApplicationStatus } from '@/core/candidate/domain/entities/Application';
import { JobRepository } from '@/core/job/domain/repositories/JobRepository';
import { ApplicationRepository } from '@/core/candidate/domain/repositories/ApplicationRepository';
import { CandidateRepository } from '@/core/candidate/domain/repositories/CandidateRepository';
import { RecruiterRepository } from '../../domain/repositories/RecruiterRepository';
import { ApplicationStatusTransition } from '../../domain/value-objects/ApplicationStatusTransition';
import { ApplicationViewMapper } from '../mappers/ApplicationViewMapper';
import { ApplicationViewDTO } from '../dtos/ApplicationViewDTO';

export interface ChangeApplicationStatusDeps {
  jobRepository: JobRepository;
  applicationRepository: ApplicationRepository;
  candidateRepository: CandidateRepository;
  recruiterRepository: RecruiterRepository;
}

export interface ChangeApplicationStatusRequest {
  recruiterId: string;
  applicationId: string;
  newStatus: ApplicationStatus;
}

export async function changeApplicationStatusUseCase(
  deps: ChangeApplicationStatusDeps,
  request: ChangeApplicationStatusRequest
): Promise<ApplicationViewDTO> {
  const recruiter = await deps.recruiterRepository.findById(request.recruiterId);
  
  if (!recruiter) {
    throw new Error('Recruiter not found');
  }
  
  const application = await deps.applicationRepository.findById(request.applicationId);
  
  if (!application) {
    throw new Error('Application not found');
  }
  
  const job = await deps.jobRepository.findById(application.jobId);
  
  if (!job) {
    throw new Error('Job not found');
  }
  
  if (job.company.id !== recruiter.companyId) {
    throw new Error('Unauthorized: Application does not belong to your company');
  }
  
  ApplicationStatusTransition.validateTransition(application.status, request.newStatus);
  
  const updatedApplication = await deps.applicationRepository.updateStatus(
    request.applicationId,
    request.newStatus
  );
  
  const candidate = await deps.candidateRepository.findById(application.candidateId);
  
  if (!candidate) {
    throw new Error('Candidate not found');
  }
  
  return ApplicationViewMapper.toDTO(updatedApplication, candidate, job);
}
