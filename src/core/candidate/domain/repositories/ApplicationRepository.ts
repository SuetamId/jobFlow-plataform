import { Application, ApplicationStatus } from '../entities/Application';

export interface ApplicationFilters {
  candidateId?: string;
  jobId?: string;
  status?: ApplicationStatus;
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

export interface CreateApplicationData {
  candidateId: string;
  jobId: string;
  coverLetter?: string | null;
  resumeUrl?: string | null;
}

export interface ApplicationRepository {
  findById(id: string): Promise<Application | null>;
  findByCandidateId(candidateId: string, pagination?: PaginationParams): Promise<PaginatedResult<Application>>;
  findByJobId(jobId: string, pagination?: PaginationParams): Promise<PaginatedResult<Application>>;
  findByCandidateAndJob(candidateId: string, jobId: string): Promise<Application | null>;
  create(data: CreateApplicationData): Promise<Application>;
  updateStatus(id: string, status: ApplicationStatus): Promise<Application>;
  withdraw(id: string): Promise<Application>;
  countByCandidateId(candidateId: string): Promise<number>;
  countActiveByJobId(jobId: string): Promise<number>;
}
