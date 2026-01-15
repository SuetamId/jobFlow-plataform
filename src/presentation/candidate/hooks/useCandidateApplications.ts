'use client';

import { useEffect, useState, useCallback } from 'react';
import { getCandidateApplicationsUseCase } from '@/core/candidate/application/use-cases';
import { ApplicationListDTO, ApplicationDTO } from '@/core/candidate/application/dtos';
import { mockApplicationRepository } from '@/infrastructure/candidate';

interface UseCandidateApplicationsResult {
  applications: ApplicationDTO[];
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
  applicationRepository: mockApplicationRepository,
};

export function useCandidateApplications(
  candidateId: string, 
  initialPage: number = 1,
  perPage: number = 10
): UseCandidateApplicationsResult {
  const [data, setData] = useState<ApplicationListDTO | null>(null);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getCandidateApplicationsUseCase(deps, {
        candidateId,
        page,
        perPage,
      });
      setData(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch applications';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [candidateId, page, perPage]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    currentPage: data?.currentPage ?? 1,
    totalPages: data?.totalPages ?? 0,
    hasNextPage: data?.hasNextPage ?? false,
    hasPreviousPage: data?.hasPreviousPage ?? false,
    isLoading,
    error,
    setPage,
    refetch: fetchApplications,
  };
}
