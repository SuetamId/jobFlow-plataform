'use client';

import { useEffect, useState, useCallback } from 'react';
import { getCandidateDashboardUseCase } from '@/core/candidate/application/use-cases';
import { DashboardSummaryDTO } from '@/core/candidate/application/dtos';
import { 
  mockCandidateRepository, 
  mockApplicationRepository,
  mockSavedJobRepository 
} from '@/infrastructure/candidate';

interface UseCandidateDashboardResult {
  dashboard: DashboardSummaryDTO | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const deps = {
  candidateRepository: mockCandidateRepository,
  applicationRepository: mockApplicationRepository,
  savedJobRepository: mockSavedJobRepository,
};

export function useCandidateDashboard(candidateId: string): UseCandidateDashboardResult {
  const [dashboard, setDashboard] = useState<DashboardSummaryDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getCandidateDashboardUseCase(deps, candidateId);
      setDashboard(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch dashboard';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [candidateId]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
}
