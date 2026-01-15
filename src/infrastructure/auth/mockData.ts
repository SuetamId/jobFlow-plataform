import { UserRoleType } from '@/core/auth/domain/value-objects/UserRole';

export interface MockUserData {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRoleType;
  avatarUrl: string | null;
  createdAt: string;
}

export const mockUsers: MockUserData[] = [
  {
    id: 'user-1',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'candidate',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'user-2',
    email: 'jane@example.com',
    password: 'password123',
    name: 'Jane Smith',
    role: 'candidate',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    createdAt: '2024-01-05T14:30:00Z',
  },
  {
    id: 'user-3',
    email: 'sarah@techflow.io',
    password: 'password123',
    name: 'Sarah Johnson',
    role: 'recruiter',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    createdAt: '2023-11-15T09:00:00Z',
  },
  {
    id: 'user-4',
    email: 'mike@janestreet.com',
    password: 'password123',
    name: 'Mike Chen',
    role: 'recruiter',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    createdAt: '2023-10-20T11:30:00Z',
  },
];

export function generateUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function generateToken(userId: string): string {
  return `mock-token-${userId}-${Date.now()}`;
}
