import { JobRepository } from '@/core/job/domain/repositories/JobRepository';
import { ApplicationRepository } from '@/core/candidate/domain/repositories/ApplicationRepository';
import { RecruiterRepository } from '../../domain/repositories/RecruiterRepository';
import { JobSummaryMapper } from '../mappers/JobSummaryMapper';
import { CreateJobDTO, JobSummaryDTO } from '../dtos/JobFormDTO';

export interface CreateJobDeps {
  jobRepository: JobRepository;
  applicationRepository: ApplicationRepository;
  recruiterRepository: RecruiterRepository;
}

export interface CreateJobRequest {
  recruiterId: string;
  jobData: CreateJobDTO;
}

export async function createJobUseCase(
  deps: CreateJobDeps,
  request: CreateJobRequest
): Promise<JobSummaryDTO> {
  const recruiter = await deps.recruiterRepository.findById(request.recruiterId);
  
  if (!recruiter) {
    throw new Error('Recruiter not found');
  }
  
  if (request.jobData.companyId !== recruiter.companyId) {
    throw new Error('Unauthorized: Cannot create jobs for another company');
  }
  
  const job = await deps.jobRepository.create({
    companyId: request.jobData.companyId,
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
  
  return JobSummaryMapper.toDTO(job, 0);
}
