import { SavedJob } from '../../domain/entities/SavedJob';
import { SavedJobDTO, SavedJobListDTO } from '../dtos/SavedJobDTO';
import { PaginatedResult } from '../../domain/repositories/SavedJobRepository';

export function mapSavedJobToDTO(savedJob: SavedJob): SavedJobDTO {
  return {
    id: savedJob.id,
    candidateId: savedJob.candidateId,
    jobId: savedJob.jobId,
    notes: savedJob.notes,
    savedAt: savedJob.savedAt.toISOString(),
  };
}

export function mapSavedJobsToDTO(savedJobs: SavedJob[]): SavedJobDTO[] {
  return savedJobs.map(mapSavedJobToDTO);
}

export function mapPaginatedSavedJobsToDTO(result: PaginatedResult<SavedJob>): SavedJobListDTO {
  return {
    items: mapSavedJobsToDTO(result.items),
    totalCount: result.totalCount,
    currentPage: result.currentPage,
    totalPages: result.totalPages,
    hasNextPage: result.hasNextPage,
    hasPreviousPage: result.hasPreviousPage,
  };
}
