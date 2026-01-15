import { ApplicationStatus } from '../../domain/entities/Application';

export interface ApplicationDTO {
  id: string;
  candidateId: string;
  jobId: string;
  status: ApplicationStatus;
  statusLabel: string;
  coverLetter: string | null;
  resumeUrl: string | null;
  isActive: boolean;
  canBeWithdrawn: boolean;
  appliedAt: string;
  updatedAt: string;
}

export interface ApplicationListDTO {
  items: ApplicationDTO[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApplyToJobInputDTO {
  candidateId: string;
  jobId: string;
  coverLetter?: string | null;
  resumeUrl?: string | null;
}
