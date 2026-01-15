import { JobRepository, JobSortOptions } from '../../domain/repositories/JobRepository';
import { JobFiltersDTO } from '../dtos/JobFiltersDTO';
import { JobListDTO } from '../dtos/JobDTO';
import { mapJobsToDTO } from '../mappers/JobMapper';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export interface GetJobsUseCaseDeps {
  jobRepository: JobRepository;
}

export async function getJobsUseCase(
  deps: GetJobsUseCaseDeps,
  filters?: JobFiltersDTO
): Promise<JobListDTO> {
  const page = filters?.page ?? DEFAULT_PAGE;
  const perPage = filters?.perPage ?? DEFAULT_PER_PAGE;

  const sort: JobSortOptions | undefined = filters?.sortBy
    ? { field: filters.sortBy, direction: filters.sortDirection ?? 'desc' }
    : undefined;

  const result = await deps.jobRepository.findAll(
    {
      search: filters?.search,
      location: filters?.location,
      hasRemote: filters?.hasRemote,
      seniority: filters?.seniority,
      contractType: filters?.contractType,
      workModel: filters?.workModel,
      companyId: filters?.companyId,
    },
    { page, perPage },
    sort
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
