import { SavedJob } from '../entities/SavedJob';

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

export interface SavedJobRepository {
  findById(id: string): Promise<SavedJob | null>;
  findByCandidateId(candidateId: string, pagination?: PaginationParams): Promise<PaginatedResult<SavedJob>>;
  findByCandidateAndJob(candidateId: string, jobId: string): Promise<SavedJob | null>;
  save(candidateId: string, jobId: string, notes?: string | null): Promise<SavedJob>;
  remove(candidateId: string, jobId: string): Promise<void>;
  updateNotes(id: string, notes: string | null): Promise<SavedJob>;
  countByCandidateId(candidateId: string): Promise<number>;
  isSaved(candidateId: string, jobId: string): Promise<boolean>;
}
