import { JobRepository } from '../../domain/repositories/JobRepository';
import { JobListDTO } from '../dtos/JobDTO';
import { mapJobsToDTO } from '../mappers/JobMapper';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export interface SearchJobsUseCaseDeps {
  jobRepository: JobRepository;
}

export interface SearchJobsInput {
  query: string;
  page?: number;
  perPage?: number;
}

export async function searchJobsUseCase(
  deps: SearchJobsUseCaseDeps,
  input: SearchJobsInput
): Promise<JobListDTO> {
  const page = input.page ?? DEFAULT_PAGE;
  const perPage = input.perPage ?? DEFAULT_PER_PAGE;

  const result = await deps.jobRepository.findAll(
    { search: input.query, isActive: true },
    { page, perPage },
    { field: 'publishedAt', direction: 'desc' }
  );

  return {
    items: mapJobsToDTO(result.items),
    totalCount: result.totalCount,
    currentPage: result.currentPage,
    totalPages: result.totalPages,
    hasNextPage: result.hasNextPage,
    hasPreviousPage: result.hasPreviousPage,
  };
}
