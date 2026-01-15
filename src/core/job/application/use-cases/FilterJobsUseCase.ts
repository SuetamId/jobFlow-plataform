import { JobRepository, JobSortOptions } from '../../domain/repositories/JobRepository';
import { JobListDTO } from '../dtos/JobDTO';
import { mapJobsToDTO } from '../mappers/JobMapper';
import { SeniorityLevel } from '../../domain/value-objects/Seniority';
import { ContractTypeValue } from '../../domain/value-objects/ContractType';
import { WorkModelType } from '../../domain/value-objects/WorkModel';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export interface FilterJobsUseCaseDeps {
  jobRepository: JobRepository;
}

export interface FilterJobsInput {
  location?: string;
  hasRemote?: boolean;
  seniority?: SeniorityLevel;
  contractType?: ContractTypeValue;
  workModel?: WorkModelType;
  companyId?: string;
  page?: number;
  perPage?: number;
  sortBy?: 'publishedAt' | 'salary' | 'title';
  sortDirection?: 'asc' | 'desc';
}

export async function filterJobsUseCase(
  deps: FilterJobsUseCaseDeps,
  input: FilterJobsInput
): Promise<JobListDTO> {
  const page = input.page ?? DEFAULT_PAGE;
  const perPage = input.perPage ?? DEFAULT_PER_PAGE;

  const sort: JobSortOptions | undefined = input.sortBy
    ? { field: input.sortBy, direction: input.sortDirection ?? 'desc' }
    : { field: 'publishedAt', direction: 'desc' };

  const result = await deps.jobRepository.findAll(
    {
      location: input.location,
      hasRemote: input.hasRemote,
      seniority: input.seniority,
      contractType: input.contractType,
      workModel: input.workModel,
      companyId: input.companyId,
      isActive: true,
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
