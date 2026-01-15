import { 
  JobRepository, 
  JobFilters, 
  PaginationParams, 
  PaginatedResult,
  JobSortOptions,
  CreateJobData,
  UpdateJobData
} from '@/core/job/domain/repositories/JobRepository';
import { Job } from '@/core/job/domain/entities/Job';
import { Company } from '@/core/job/domain/entities/Company';
import { Location } from '@/core/job/domain/value-objects/Location';
import { SalaryRange, Currency } from '@/core/job/domain/value-objects/SalaryRange';
import { Seniority } from '@/core/job/domain/value-objects/Seniority';
import { ContractType } from '@/core/job/domain/value-objects/ContractType';
import { WorkModel } from '@/core/job/domain/value-objects/WorkModel';
import { mockJobs, mockCompanies, MockJobData, generateJobId, generateExternalId } from './mockData';

const SIMULATED_DELAY = 300;
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

function mapToJobEntity(data: MockJobData): Job {
  const company = Company.create({
    id: data.company.id,
    name: data.company.name,
    logo: data.company.logo,
    description: data.company.description,
    websiteUrl: data.company.website_url,
    linkedinUrl: data.company.linkedin_url,
    twitterHandle: data.company.twitter_handle,
    githubUrl: data.company.github_url,
    industry: data.company.industry,
    size: data.company.size,
    foundedYear: data.company.founded_year,
  });

  const location = Location.create({
    city: data.city,
    state: data.state,
    country: data.country,
    isRemote: data.is_remote,
  });

  const salary = SalaryRange.create(
    data.salary_min, 
    data.salary_max, 
    data.salary_currency as Currency | null
  );

  const seniority = data.seniority ? Seniority.create(data.seniority) : null;
  const contractTypes = data.contract_types.map(ct => ContractType.create(ct));
  const workModel = WorkModel.create(data.work_model);

  return Job.create({
    id: data.id,
    externalId: data.ext_id,
    company,
    title: data.title,
    location,
    contractTypes,
    workModel,
    publishedAt: new Date(data.published),
    expiresAt: data.expires_at ? new Date(data.expires_at) : null,
    description: data.description,
    applicationUrl: data.application_url,
    seniority,
    salary,
    isFeatured: data.is_featured,
  });
}

export class MockJobRepository implements JobRepository {
  async findAll(
    filters?: JobFilters,
    pagination?: PaginationParams,
    sort?: JobSortOptions
  ): Promise<PaginatedResult<Job>> {
    await this.simulateDelay();

    let filteredJobs = [...mockJobs];

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(
        job =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.name.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters?.location) {
      const locationTerm = filters.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job => {
        const cityMatch = job.city?.toLowerCase().includes(locationTerm);
        const stateMatch = job.state?.toLowerCase().includes(locationTerm);
        const countryMatch = job.country?.toLowerCase().includes(locationTerm);
        return cityMatch || stateMatch || countryMatch;
      });
    }

    if (filters?.hasRemote !== undefined) {
      filteredJobs = filteredJobs.filter(job => job.is_remote === filters.hasRemote);
    }

    if (filters?.seniority) {
      filteredJobs = filteredJobs.filter(job => job.seniority === filters.seniority);
    }

    if (filters?.contractType) {
      filteredJobs = filteredJobs.filter(job =>
        job.contract_types.includes(filters.contractType!)
      );
    }

    if (filters?.workModel) {
      filteredJobs = filteredJobs.filter(job => job.work_model === filters.workModel);
    }

    if (filters?.companyId) {
      filteredJobs = filteredJobs.filter(job => job.company.id === filters.companyId);
    }

    if (filters?.isActive !== undefined) {
      const now = new Date();
      filteredJobs = filteredJobs.filter(job => {
        if (!job.expires_at) return filters.isActive;
        const isExpired = new Date(job.expires_at) < now;
        return filters.isActive ? !isExpired : isExpired;
      });
    }

    if (sort) {
      filteredJobs.sort((a, b) => {
        let comparison = 0;
        
        switch (sort.field) {
          case 'publishedAt':
            comparison = new Date(a.published).getTime() - new Date(b.published).getTime();
            break;
          case 'salary':
            const salaryA = a.salary_max ?? a.salary_min ?? 0;
            const salaryB = b.salary_max ?? b.salary_min ?? 0;
            comparison = salaryA - salaryB;
            break;
          case 'title':
            comparison = a.title.localeCompare(b.title);
            break;
        }

        return sort.direction === 'desc' ? -comparison : comparison;
      });
    }

    const page = pagination?.page ?? DEFAULT_PAGE;
    const perPage = pagination?.perPage ?? DEFAULT_PER_PAGE;
    const totalCount = filteredJobs.length;
    const totalPages = Math.ceil(totalCount / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const paginatedData = filteredJobs.slice(startIndex, endIndex);
    const items = paginatedData.map(mapToJobEntity);

    return {
      items,
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async findById(id: string): Promise<Job | null> {
    await this.simulateDelay();

    const jobData = mockJobs.find(job => job.id === id);

    if (!jobData) {
      return null;
    }

    return mapToJobEntity(jobData);
  }

  async findFeatured(limit: number): Promise<Job[]> {
    await this.simulateDelay();

    const featuredData = mockJobs
      .filter(job => job.is_featured)
      .slice(0, limit);
    
    if (featuredData.length < limit) {
      const nonFeatured = mockJobs
        .filter(job => !job.is_featured)
        .slice(0, limit - featuredData.length);
      featuredData.push(...nonFeatured);
    }

    return featuredData.map(mapToJobEntity);
  }

  async findByCompanyId(
    companyId: string, 
    pagination?: PaginationParams
  ): Promise<PaginatedResult<Job>> {
    return this.findAll({ companyId }, pagination);
  }

  async countActiveJobs(): Promise<number> {
    await this.simulateDelay();
    const now = new Date();
    return mockJobs.filter(job => {
      if (!job.expires_at) return true;
      return new Date(job.expires_at) > now;
    }).length;
  }

  async create(data: CreateJobData): Promise<Job> {
    await this.simulateDelay();
    
    const company = mockCompanies.find(c => c.id === data.companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    
    const newJob: MockJobData = {
      id: generateJobId(),
      ext_id: generateExternalId(),
      company,
      title: data.title,
      city: data.city,
      state: data.state,
      country: data.country,
      is_remote: data.isRemote,
      work_model: data.workModel,
      contract_types: data.contractTypes,
      published: new Date().toISOString(),
      expires_at: data.expiresAt?.toISOString() ?? null,
      description: data.description,
      application_url: data.applicationUrl,
      seniority: data.seniority,
      salary_min: data.salaryMin,
      salary_max: data.salaryMax,
      salary_currency: data.salaryCurrency,
      is_featured: false,
    };
    
    mockJobs.unshift(newJob);
    
    return mapToJobEntity(newJob);
  }

  async update(data: UpdateJobData): Promise<Job> {
    await this.simulateDelay();
    
    const jobIndex = mockJobs.findIndex(j => j.id === data.id);
    if (jobIndex === -1) {
      throw new Error('Job not found');
    }
    
    const existingJob = mockJobs[jobIndex];
    
    mockJobs[jobIndex] = {
      ...existingJob,
      title: data.title ?? existingJob.title,
      city: data.city !== undefined ? data.city : existingJob.city,
      state: data.state !== undefined ? data.state : existingJob.state,
      country: data.country !== undefined ? data.country : existingJob.country,
      is_remote: data.isRemote ?? existingJob.is_remote,
      work_model: data.workModel ?? existingJob.work_model,
      contract_types: data.contractTypes ?? existingJob.contract_types,
      expires_at: data.expiresAt !== undefined 
        ? (data.expiresAt?.toISOString() ?? null) 
        : existingJob.expires_at,
      description: data.description ?? existingJob.description,
      application_url: data.applicationUrl ?? existingJob.application_url,
      seniority: data.seniority !== undefined ? data.seniority : existingJob.seniority,
      salary_min: data.salaryMin !== undefined ? data.salaryMin : existingJob.salary_min,
      salary_max: data.salaryMax !== undefined ? data.salaryMax : existingJob.salary_max,
      salary_currency: data.salaryCurrency !== undefined ? data.salaryCurrency : existingJob.salary_currency,
    };
    
    return mapToJobEntity(mockJobs[jobIndex]);
  }

  private simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  }
}

export const mockJobRepository = new MockJobRepository();
