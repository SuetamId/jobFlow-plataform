import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserProfileDTO, UpdateUserProfileDTO } from '../dtos/UserProfileDTO';
import { mapUserProfileToDTO } from '../mappers/UserProfileMapper';

export interface UpdateUserProfileUseCaseDeps {
  userRepository: UserRepository;
}

export async function updateUserProfileUseCase(
  deps: UpdateUserProfileUseCaseDeps,
  userId: string,
  data: UpdateUserProfileDTO
): Promise<UserProfileDTO> {
  const profile = await deps.userRepository.update(userId, data);
  return mapUserProfileToDTO(profile);
}
