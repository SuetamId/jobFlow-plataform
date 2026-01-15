import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserProfileDTO } from '../dtos/UserProfileDTO';
import { mapUserProfileToDTO } from '../mappers/UserProfileMapper';

export interface GetUserProfileUseCaseDeps {
  userRepository: UserRepository;
}

export async function getUserProfileUseCase(
  deps: GetUserProfileUseCaseDeps,
  userId: string
): Promise<UserProfileDTO | null> {
  const profile = await deps.userRepository.findById(userId);
  
  if (!profile) {
    return null;
  }
  
  return mapUserProfileToDTO(profile);
}
