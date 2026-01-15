import { RecruiterRepository } from '../../domain/repositories/RecruiterRepository';
import { RecruiterMapper } from '../mappers/RecruiterMapper';
import { RecruiterDTO } from '../dtos/RecruiterDTO';

export interface GetRecruiterByUserIdDeps {
  recruiterRepository: RecruiterRepository;
}

export async function getRecruiterByUserIdUseCase(
  deps: GetRecruiterByUserIdDeps,
  userId: string
): Promise<RecruiterDTO | null> {
  const recruiter = await deps.recruiterRepository.findByUserId(userId);
  
  if (!recruiter) {
    return null;
  }
  
  return RecruiterMapper.toDTO(recruiter);
}
