import { Job } from '../entities/Job';
import { SeniorityLevel } from '../value-objects/Seniority';
import { ContractTypeValue } from '../value-objects/ContractType';
import { WorkModelType } from '../value-objects/WorkModel';

export interface JobFilters {
  search?: string;
  location?: string;
  hasRemote?: boolean;
  seniority?: SeniorityLevel;
  contractType?: ContractTypeValue;
  workModel?: WorkModelType;
  companyId?: string;
  isActive?: boolean;
}

export interface JobSortOptions {
  field: 'publishedAt' | 'salary' | 'title';
  direction: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CreateJobData {
  companyId: string;
  title: string;
  description: string;
  city: string | null;
  state: string | null;
  country: string | null;
  isRemote: boolean;
  workModel: WorkModelType;
  contractTypes: ContractTypeValue[];
  seniority: SeniorityLevel | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: 'USD' | 'EUR' | 'GBP' | 'BRL' | 'CAD' | null;
  applicationUrl: string;
  expiresAt: Date | null;
}

export interface UpdateJobData extends Partial<Omit<CreateJobData, 'companyId'>> {
  id: string;
}

export interface JobRepository {
  findAll(
    filters?: JobFilters, 
    pagination?: PaginationParams, 
    sort?: JobSortOptions
  ): Promise<PaginatedResult<Job>>;
  findById(id: string): Promise<Job | null>;
  findFeatured(limit: number): Promise<Job[]>;
  findByCompanyId(companyId: string, pagination?: PaginationParams): Promise<PaginatedResult<Job>>;
  countActiveJobs(): Promise<number>;
  create(data: CreateJobData): Promise<Job>;
  update(data: UpdateJobData): Promise<Job>;
}
