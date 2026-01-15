import { ApplicationRepository, PaginationParams } from '../../domain/repositories/ApplicationRepository';
import { ApplicationListDTO } from '../dtos/ApplicationDTO';
import { mapPaginatedApplicationsToDTO } from '../mappers/ApplicationMapper';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export interface GetCandidateApplicationsUseCaseDeps {
  applicationRepository: ApplicationRepository;
}

export interface GetCandidateApplicationsInput {
  candidateId: string;
  page?: number;
  perPage?: number;
}

export async function getCandidateApplicationsUseCase(
  deps: GetCandidateApplicationsUseCaseDeps,
  input: GetCandidateApplicationsInput
): Promise<ApplicationListDTO> {
  const pagination: PaginationParams = {
    page: input.page ?? DEFAULT_PAGE,
    perPage: input.perPage ?? DEFAULT_PER_PAGE,
  };

  const result = await deps.applicationRepository.findByCandidateId(
    input.candidateId,
    pagination
  );

  return mapPaginatedApplicationsToDTO(result);
}
