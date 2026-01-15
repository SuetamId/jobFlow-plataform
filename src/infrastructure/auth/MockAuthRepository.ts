import { AuthRepository, AuthResult } from '@/core/auth/domain/repositories/AuthRepository';
import { User } from '@/core/auth/domain/entities/User';
import { Credentials } from '@/core/auth/domain/value-objects/Credentials';
import { UserRoleType } from '@/core/auth/domain/value-objects/UserRole';
import { mockUsers, MockUserData, generateUserId, generateToken } from './mockData';

const SIMULATED_DELAY = 500;

let currentUser: MockUserData | null = null;
let currentToken: string | null = null;

export class MockAuthRepository implements AuthRepository {
  async login(credentials: Credentials): Promise<AuthResult> {
    await this.simulateDelay();

    const email = credentials.email.toString();
    const password = credentials.password;

    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    currentUser = user;
    currentToken = generateToken(user.id);

    return {
      user: User.create({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
        createdAt: new Date(user.createdAt),
      }),
      token: currentToken,
    };
  }

  async register(credentials: Credentials, name: string, role: UserRoleType = 'candidate'): Promise<AuthResult> {
    await this.simulateDelay();

    const email = credentials.email.toString();

    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const newUser: MockUserData = {
      id: generateUserId(),
      email,
      password: credentials.password,
      name,
      role,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/\s+/g, '')}`,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    currentUser = newUser;
    currentToken = generateToken(newUser.id);

    return {
      user: User.create({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        avatarUrl: newUser.avatarUrl,
        createdAt: new Date(newUser.createdAt),
      }),
      token: currentToken,
    };
  }

  async logout(): Promise<void> {
    await this.simulateDelay();
    currentUser = null;
    currentToken = null;
  }

  async getCurrentUser(): Promise<User | null> {
    await this.simulateDelay();

    if (!currentUser) {
      return null;
    }

    return User.create({
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name,
      role: currentUser.role,
      avatarUrl: currentUser.avatarUrl,
      createdAt: new Date(currentUser.createdAt),
    });
  }

  async validateToken(token: string): Promise<boolean> {
    await this.simulateDelay();
    
    if (!token || !token.startsWith('mock-token-')) {
      return false;
    }

    const parts = token.split('-');
    const userId = parts.slice(2, -1).join('-');
    const user = mockUsers.find(u => u.id === userId);
    
    if (user) {
      currentUser = user;
      currentToken = token;
      return true;
    }

    return false;
  }

  private simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  }
}

export const mockAuthRepository = new MockAuthRepository();
