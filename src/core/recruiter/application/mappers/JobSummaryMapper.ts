import { Job } from '@/core/job/domain/entities/Job';
import { JobSummaryDTO } from '../dtos/JobFormDTO';

export class JobSummaryMapper {
  static toDTO(job: Job, applicationCount: number): JobSummaryDTO {
    return {
      id: job.id,
      title: job.title,
      companyName: job.company.name,
      companyLogo: job.company.logo,
      location: job.getFormattedLocation(),
      workModel: job.workModel.getLabel(),
      seniority: job.seniority?.getLabel() ?? null,
      salary: job.getFormattedSalary(),
      publishedAt: job.publishedAt.toISOString(),
      expiresAt: job.expiresAt?.toISOString() ?? null,
      isActive: job.isActive(),
      applicationCount,
    };
  }
}
