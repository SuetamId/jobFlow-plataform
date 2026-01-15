import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { AuthStoragePort } from '../ports/AuthStoragePort';
import { UserDTO } from '../dtos/UserDTO';

export interface GetCurrentUserUseCaseDeps {
  authRepository: AuthRepository;
  authStorage: AuthStoragePort;
}

export async function getCurrentUserUseCase(
  deps: GetCurrentUserUseCaseDeps
): Promise<UserDTO | null> {
  const token = deps.authStorage.getToken();
  
  if (!token) {
    return null;
  }
  
  const isValid = await deps.authRepository.validateToken(token);
  
  if (!isValid) {
    deps.authStorage.removeToken();
    return null;
  }
  
  const user = await deps.authRepository.getCurrentUser();
  
  if (!user) {
    deps.authStorage.removeToken();
    return null;
  }
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role.type,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt.toISOString(),
  };
}
