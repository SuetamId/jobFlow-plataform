import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { AuthStoragePort } from '../ports/AuthStoragePort';

export interface LogoutUseCaseDeps {
  authRepository: AuthRepository;
  authStorage: AuthStoragePort;
}

export async function logoutUseCase(deps: LogoutUseCaseDeps): Promise<void> {
  await deps.authRepository.logout();
  deps.authStorage.removeToken();
}
