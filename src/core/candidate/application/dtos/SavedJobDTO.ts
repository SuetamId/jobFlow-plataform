export interface SavedJobDTO {
  id: string;
  candidateId: string;
  jobId: string;
  notes: string | null;
  savedAt: string;
}

export interface SavedJobListDTO {
  items: SavedJobDTO[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SaveJobInputDTO {
  candidateId: string;
  jobId: string;
  notes?: string | null;
}
