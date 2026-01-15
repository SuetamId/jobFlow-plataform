import { UserRoleType } from '../../domain/value-objects/UserRole';

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  role: UserRoleType;
  avatarUrl: string | null;
  createdAt: string;
}
