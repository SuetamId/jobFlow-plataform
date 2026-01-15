import { JobRepository, PaginationParams, PaginatedResult } from '@/core/job/domain/repositories/JobRepository';
import { ApplicationRepository } from '@/core/candidate/domain/repositories/ApplicationRepository';
import { RecruiterRepository } from '../../domain/repositories/RecruiterRepository';
import { JobSummaryMapper } from '../mappers/JobSummaryMapper';
import { JobSummaryDTO } from '../dtos/JobFormDTO';

export interface GetCompanyJobsDeps {
  jobRepository: JobRepository;
  applicationRepository: ApplicationRepository;
  recruiterRepository: RecruiterRepository;
}

export interface GetCompanyJobsRequest {
  recruiterId: string;
  pagination?: PaginationParams;
}

export async function getCompanyJobsUseCase(
  deps: GetCompanyJobsDeps,
  request: GetCompanyJobsRequest
): Promise<PaginatedResult<JobSummaryDTO>> {
  const recruiter = await deps.recruiterRepository.findById(request.recruiterId);
  
  if (!recruiter) {
    throw new Error('Recruiter not found');
  }
  
  const jobsResult = await deps.jobRepository.findByCompanyId(
    recruiter.companyId,
    request.pagination
  );
  
  const jobSummaries = await Promise.all(
    jobsResult.items.map(async job => {
      const applicationCount = await deps.applicationRepository.countActiveByJobId(job.id);
      return JobSummaryMapper.toDTO(job, applicationCount);
    })
  );
  
  return {
    items: jobSummaries,
    totalCount: jobsResult.totalCount,
    currentPage: jobsResult.currentPage,
    totalPages: jobsResult.totalPages,
    hasNextPage: jobsResult.hasNextPage,
    hasPreviousPage: jobsResult.hasPreviousPage,
  };
}
