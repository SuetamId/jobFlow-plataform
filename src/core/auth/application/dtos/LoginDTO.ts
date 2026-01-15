import { UserRoleType } from '../../domain/value-objects/UserRole';

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  email: string;
  password: string;
  name: string;
  role?: UserRoleType;
}

export interface AuthResponseDTO {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRoleType;
    avatarUrl: string | null;
    createdAt: string;
  };
  token: string;
}
