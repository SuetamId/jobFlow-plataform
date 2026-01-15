import { User } from '../entities/User';
import { Credentials } from '../value-objects/Credentials';
import { UserRoleType } from '../value-objects/UserRole';

export interface AuthResult {
  user: User;
  token: string;
}

export interface AuthRepository {
  login(credentials: Credentials): Promise<AuthResult>;
  register(credentials: Credentials, name: string, role?: UserRoleType): Promise<AuthResult>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  validateToken(token: string): Promise<boolean>;
}
