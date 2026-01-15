import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { Credentials } from '../../domain/value-objects/Credentials';
import { AuthStoragePort } from '../ports/AuthStoragePort';
import { AuthResponseDTO, RegisterRequestDTO } from '../dtos/LoginDTO';

export interface RegisterUseCaseDeps {
  authRepository: AuthRepository;
  authStorage: AuthStoragePort;
}

export async function registerUseCase(
  deps: RegisterUseCaseDeps,
  request: RegisterRequestDTO
): Promise<AuthResponseDTO> {
  const credentials = Credentials.create(request.email, request.password);
  const role = request.role ?? 'candidate';
  const result = await deps.authRepository.register(credentials, request.name, role);
  
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
