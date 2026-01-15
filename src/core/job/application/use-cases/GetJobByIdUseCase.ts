import { JobRepository } from '../../domain/repositories/JobRepository';
import { JobDTO } from '../dtos/JobDTO';
import { mapJobToDTO } from '../mappers/JobMapper';

export interface GetJobByIdUseCaseDeps {
  jobRepository: JobRepository;
}

export async function getJobByIdUseCase(
  deps: GetJobByIdUseCaseDeps,
  id: string
): Promise<JobDTO | null> {
  const job = await deps.jobRepository.findById(id);

  if (!job) {
    return null;
  }

  return mapJobToDTO(job);
}
