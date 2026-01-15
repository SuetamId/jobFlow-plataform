'use client';

import { useEffect, useState, useCallback } from 'react';
import { getCandidateSavedJobsUseCase } from '@/core/candidate/application/use-cases';
import { SavedJobListDTO, SavedJobDTO } from '@/core/candidate/application/dtos';
import { mockSavedJobRepository } from '@/infrastructure/candidate';

interface UseCandidateSavedJobsResult {
  savedJobs: SavedJobDTO[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  refetch: () => void;
}

const deps = {
  savedJobRepository: mockSavedJobRepository,
};

export function useCandidateSavedJobs(
  candidateId: string,
  initialPage: number = 1,
  perPage: number = 10
): UseCandidateSavedJobsResult {
  const [data, setData] = useState<SavedJobListDTO | null>(null);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getCandidateSavedJobsUseCase(deps, {
        candidateId,
        page,
        perPage,
      });
      setData(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch saved jobs';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [candidateId, page, perPage]);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  return {
    savedJobs: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    currentPage: data?.currentPage ?? 1,
    totalPages: data?.totalPages ?? 0,
    hasNextPage: data?.hasNextPage ?? false,
    hasPreviousPage: data?.hasPreviousPage ?? false,
    isLoading,
    error,
    setPage,
    refetch: fetchSavedJobs,
  };
}
