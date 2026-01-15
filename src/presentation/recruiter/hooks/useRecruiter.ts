import { useState, useEffect, useCallback } from 'react';
import { RecruiterDTO } from '@/core/recruiter/application/dtos';
import { getRecruiterByUserIdUseCase } from '@/core/recruiter/application/use-cases';
import { mockRecruiterRepository } from '@/infrastructure/recruiter';
import { useAuth } from '@/presentation/auth';

interface UseRecruiterResult {
  recruiter: RecruiterDTO | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useRecruiter(): UseRecruiterResult {
  const { user } = useAuth();
  const [recruiter, setRecruiter] = useState<RecruiterDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecruiter = useCallback(async () => {
    if (!user) {
      setRecruiter(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getRecruiterByUserIdUseCase(
        { recruiterRepository: mockRecruiterRepository },
        user.id
      );
      setRecruiter(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch recruiter'));
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchRecruiter();
  }, [fetchRecruiter]);

  return {
    recruiter,
    isLoading,
    error,
    refresh: fetchRecruiter,
  };
}
