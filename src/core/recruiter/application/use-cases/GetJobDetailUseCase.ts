import { JobRepository } from '@/core/job/domain/repositories/JobRepository';
import { ApplicationRepository } from '@/core/candidate/domain/repositories/ApplicationRepository';
import { RecruiterRepository } from '../../domain/repositories/RecruiterRepository';
import { JobSummaryMapper } from '../mappers/JobSummaryMapper';
import { JobSummaryDTO } from '../dtos/JobFormDTO';

export interface GetJobDetailDeps {
  jobRepository: JobRepository;
  applicationRepository: ApplicationRepository;
  recruiterRepository: RecruiterRepository;
}

export interface GetJobDetailRequest {
  recruiterId: string;
  jobId: string;
}

export async function getJobDetailUseCase(
  deps: GetJobDetailDeps,
  request: GetJobDetailRequest
): Promise<JobSummaryDTO> {
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
  
  const applicationCount = await deps.applicationRepository.countActiveByJobId(job.id);
  
  return JobSummaryMapper.toDTO(job, applicationCount);
}
