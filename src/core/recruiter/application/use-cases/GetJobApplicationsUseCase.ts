import { JobRepository } from '@/core/job/domain/repositories/JobRepository';
import { ApplicationRepository, PaginationParams, PaginatedResult } from '@/core/candidate/domain/repositories/ApplicationRepository';
import { CandidateRepository } from '@/core/candidate/domain/repositories/CandidateRepository';
import { RecruiterRepository } from '../../domain/repositories/RecruiterRepository';
import { ApplicationViewMapper } from '../mappers/ApplicationViewMapper';
import { ApplicationViewDTO } from '../dtos/ApplicationViewDTO';

export interface GetJobApplicationsDeps {
  jobRepository: JobRepository;
  applicationRepository: ApplicationRepository;
  candidateRepository: CandidateRepository;
  recruiterRepository: RecruiterRepository;
}

export interface GetJobApplicationsRequest {
  recruiterId: string;
  jobId: string;
  pagination?: PaginationParams;
}

export async function getJobApplicationsUseCase(
  deps: GetJobApplicationsDeps,
  request: GetJobApplicationsRequest
): Promise<PaginatedResult<ApplicationViewDTO>> {
  const recruiter = await deps.recruiterRepository.findById(request.recruiterId);
  
  if (!recruiter) {
    throw new Error('Recruiter not found');
  }
  
  const job = await deps.jobRepository.findById(request.jobId);
  
  if (!job) {
    throw new Error('Job not found');
  }
  
  if (job.company.id !== recruiter.companyId) {
    throw new Error('Unauthorized: Job does not belong to your company');
  }
  
  const applicationsResult = await deps.applicationRepository.findByJobId(
    request.jobId,
    request.pagination
  );
  
  const applicationViews = await Promise.all(
    applicationsResult.items.map(async application => {
      const candidate = await deps.candidateRepository.findById(application.candidateId);
      
      if (!candidate) {
        throw new Error(`Candidate not found: ${application.candidateId}`);
      }
      
      return ApplicationViewMapper.toDTO(application, candidate, job);
    })
  );
  
  return {
    items: applicationViews,
    totalCount: applicationsResult.totalCount,
    currentPage: applicationsResult.currentPage,
    totalPages: applicationsResult.totalPages,
    hasNextPage: applicationsResult.hasNextPage,
    hasPreviousPage: applicationsResult.hasPreviousPage,
  };
}
