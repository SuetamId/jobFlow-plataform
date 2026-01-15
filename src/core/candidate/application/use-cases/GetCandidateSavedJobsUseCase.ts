import { SavedJobRepository, PaginationParams } from '../../domain/repositories/SavedJobRepository';
import { SavedJobListDTO } from '../dtos/SavedJobDTO';
import { mapPaginatedSavedJobsToDTO } from '../mappers/SavedJobMapper';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export interface GetCandidateSavedJobsUseCaseDeps {
  savedJobRepository: SavedJobRepository;
}

export interface GetCandidateSavedJobsInput {
  candidateId: string;
  page?: number;
  perPage?: number;
}

export async function getCandidateSavedJobsUseCase(
  deps: GetCandidateSavedJobsUseCaseDeps,
  input: GetCandidateSavedJobsInput
): Promise<SavedJobListDTO> {
  const pagination: PaginationParams = {
    page: input.page ?? DEFAULT_PAGE,
    perPage: input.perPage ?? DEFAULT_PER_PAGE,
  };

  const result = await deps.savedJobRepository.findByCandidateId(
    input.candidateId,
    pagination
  );

  return mapPaginatedSavedJobsToDTO(result);
}
