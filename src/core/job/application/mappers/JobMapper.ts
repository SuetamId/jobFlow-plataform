import { Job } from '../../domain/entities/Job';
import { JobDTO, CompanyDTO } from '../dtos/JobDTO';

export function mapJobToDTO(job: Job): JobDTO {
  const company = job.company;
  const companyDTO: CompanyDTO = {
    id: String(company.id),
    name: company.name,
    logo: company.logo,
    websiteUrl: company.websiteUrl,
    linkedinUrl: company.linkedinUrl,
    twitterHandle: company.twitterHandle,
    githubUrl: company.githubUrl,
  };

  const salary = job.salary;
  const location = job.location;

  return {
    id: job.id,
    externalId: job.externalId,
    company: companyDTO,
    title: job.title,
    location: job.getFormattedLocation(),
    city: location.city,
    state: location.state,
    country: location.country,
    hasRemote: job.hasRemote(),
    workModel: job.workModel.getValue(),
    workModelLabel: job.workModel.getLabel(),
    contractTypes: job.contractTypes.map(ct => ct.getValue()),
    contractTypeLabels: job.getContractTypeLabels(),
    publishedAt: job.publishedAt.toISOString(),
    expiresAt: job.expiresAt?.toISOString() ?? null,
    isExpired: job.isExpired(),
    isActive: job.isActive(),
    description: job.description,
    applicationUrl: job.applicationUrl,
    seniority: job.seniority?.getLevel() ?? null,
    seniorityLabel: job.getSeniorityLabel(),
    salaryMin: salary.min,
    salaryMax: salary.max,
    salaryCurrency: salary.currency,
    salaryFormatted: job.getFormattedSalary(),
    isFeatured: job.isFeatured,
  };
}

export function mapJobsToDTO(jobs: Job[]): JobDTO[] {
  return jobs.map(mapJobToDTO);
}
