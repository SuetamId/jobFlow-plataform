import { JobRepository } from '../../domain/repositories/JobRepository';
import { JobDTO } from '../dtos/JobDTO';
import { mapJobsToDTO } from '../mappers/JobMapper';

const DEFAULT_FEATURED_LIMIT = 6;

export interface GetFeaturedJobsUseCaseDeps {
  jobRepository: JobRepository;
}

export async function getFeaturedJobsUseCase(
  deps: GetFeaturedJobsUseCaseDeps,
  limit: number = DEFAULT_FEATURED_LIMIT
): Promise<JobDTO[]> {
  const jobs = await deps.jobRepository.findFeatured(limit);
  return mapJobsToDTO(jobs);
}
