'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { UserDTO, LoginRequestDTO, RegisterRequestDTO } from '@/core/auth/application/dtos';
import { loginUseCase, registerUseCase, logoutUseCase, getCurrentUserUseCase } from '@/core/auth/application/use-cases';
import { mockAuthRepository, mockAuthStorage } from '@/infrastructure/auth';

interface AuthState {
  user: UserDTO | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (credentials: LoginRequestDTO) => Promise<void>;
  loginWithRedirect: (credentials: LoginRequestDTO) => Promise<string>;
  register: (data: RegisterRequestDTO) => Promise<void>;
  logout: () => Promise<void>;
  getDefaultRoute: () => string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const deps = {
    authRepository: mockAuthRepository,
    authStorage: mockAuthStorage,
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getCurrentUserUseCase(deps);
        setState({
          user,
          isAuthenticated: user !== null,
          isLoading: false,
        });
      } catch {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initAuth();
  }, []);

  const getDefaultRoute = useCallback(() => {
    if (!state.user) return '/login';
    return state.user.role === 'recruiter' ? '/recruiter' : '/dashboard';
  }, [state.user]);

  const login = useCallback(async (credentials: LoginRequestDTO) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await loginUseCase(deps, credentials);
      setState({
        user: result.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const loginWithRedirect = useCallback(async (credentials: LoginRequestDTO): Promise<string> => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await loginUseCase(deps, credentials);
      setState({
        user: result.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return result.user.role === 'recruiter' ? '/recruiter' : '/dashboard';
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const register = useCallback(async (data: RegisterRequestDTO) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await registerUseCase(deps, data);
      setState({
        user: result.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      await logoutUseCase(deps);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, loginWithRedirect, register, logout, getDefaultRoute }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
}
