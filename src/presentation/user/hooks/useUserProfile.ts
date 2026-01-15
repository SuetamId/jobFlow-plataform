'use client';

import { useEffect, useState, useCallback } from 'react';
import { UserProfileDTO, UpdateUserProfileDTO } from '@/core/user/application/dtos';
import { getUserProfileUseCase, updateUserProfileUseCase } from '@/core/user/application/use-cases';
import { mockUserRepository } from '@/infrastructure/user';
import { useAuth } from '@/presentation/auth/hooks/useAuth';

interface UseUserProfileResult {
  profile: UserProfileDTO | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: UpdateUserProfileDTO) => Promise<void>;
  refetch: () => void;
}

const deps = { userRepository: mockUserRepository };

export function useUserProfile(): UseUserProfileResult {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getUserProfileUseCase(deps, user.id);
      setProfile(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (data: UpdateUserProfileDTO) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await updateUserProfileUseCase(deps, user.id, data);
      setProfile(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
}
