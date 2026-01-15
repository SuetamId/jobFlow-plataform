import { JobRepository } from '@/core/job/domain/repositories/JobRepository';
import { ApplicationRepository } from '@/core/candidate/domain/repositories/ApplicationRepository';
import { RecruiterRepository } from '../../domain/repositories/RecruiterRepository';
import { JobSummaryMapper } from '../mappers/JobSummaryMapper';
import { UpdateJobDTO, JobSummaryDTO } from '../dtos/JobFormDTO';

export interface UpdateJobDeps {
  jobRepository: JobRepository;
  applicationRepository: ApplicationRepository;
  recruiterRepository: RecruiterRepository;
}

export interface UpdateJobRequest {
  recruiterId: string;
  jobData: UpdateJobDTO;
}

export async function updateJobUseCase(
  deps: UpdateJobDeps,
  request: UpdateJobRequest
): Promise<JobSummaryDTO> {
  const recruiter = await deps.recruiterRepository.findById(request.recruiterId);
  
  if (!recruiter) {
    throw new Error('Recruiter not found');
  }
  
  const existingJob = await deps.jobRepository.findById(request.jobData.id);
  
  if (!existingJob) {
    throw new Error('Job not found');
  }
  
  if (existingJob.company.id !== recruiter.companyId) {
    throw new Error('Unauthorized: Cannot update jobs from another company');
  }
  
  const updatedJob = await deps.jobRepository.update({
    id: request.jobData.id,
    title: request.jobData.title,
    description: request.jobData.description,
    city: request.jobData.city,
    state: request.jobData.state,
    country: request.jobData.country,
    isRemote: request.jobData.isRemote,
    workModel: request.jobData.workModel,
    contractTypes: request.jobData.contractTypes,
    seniority: request.jobData.seniority,
    salaryMin: request.jobData.salaryMin,
    salaryMax: request.jobData.salaryMax,
    salaryCurrency: request.jobData.salaryCurrency,
    applicationUrl: request.jobData.applicationUrl,
    expiresAt: request.jobData.expiresAt ? new Date(request.jobData.expiresAt) : null,
  });
  
  const applicationCount = await deps.applicationRepository.countActiveByJobId(updatedJob.id);
  
  return JobSummaryMapper.toDTO(updatedJob, applicationCount);
}
