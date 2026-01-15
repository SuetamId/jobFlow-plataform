import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { Credentials } from '../../domain/value-objects/Credentials';
import { AuthStoragePort } from '../ports/AuthStoragePort';
import { AuthResponseDTO, LoginRequestDTO } from '../dtos/LoginDTO';

export interface LoginUseCaseDeps {
  authRepository: AuthRepository;
  authStorage: AuthStoragePort;
}

export async function loginUseCase(
  deps: LoginUseCaseDeps,
  request: LoginRequestDTO
): Promise<AuthResponseDTO> {
  const credentials = Credentials.create(request.email, request.password);
  const result = await deps.authRepository.login(credentials);
  
  deps.authStorage.setToken(result.token);
  
  return {
    user: {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      role: result.user.role.type,
      avatarUrl: result.user.avatarUrl,
      createdAt: result.user.createdAt.toISOString(),
    },
    token: result.token,
  };
}
