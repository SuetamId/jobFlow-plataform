'use client';

import { useEffect, useState, useCallback } from 'react';
import { JobDTO, JobListDTO, JobFiltersDTO } from '@/core/job/application/dtos';
import { getJobsUseCase } from '@/core/job/application/use-cases';
import { mockJobRepository } from '@/infrastructure/job';

interface UseJobsResult {
  jobs: JobDTO[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const deps = { jobRepository: mockJobRepository };

export function useJobs(filters?: JobFiltersDTO): UseJobsResult {
  const [data, setData] = useState<JobListDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getJobsUseCase(deps, filters);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  }, [
    filters?.search,
    filters?.location,
    filters?.hasRemote,
    filters?.seniority,
    filters?.contractType,
    filters?.workModel,
    filters?.companyId,
    filters?.page,
    filters?.perPage,
    filters?.sortBy,
    filters?.sortDirection,
  ]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    currentPage: data?.currentPage ?? 1,
    totalPages: data?.totalPages ?? 0,
    hasNextPage: data?.hasNextPage ?? false,
    hasPreviousPage: data?.hasPreviousPage ?? false,
    isLoading,
    error,
    refetch: fetchJobs,
  };
}
