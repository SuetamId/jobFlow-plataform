'use client';

import { useEffect, useState, useCallback } from 'react';
import { JobDTO } from '@/core/job/application/dtos';
import { getFeaturedJobsUseCase } from '@/core/job/application/use-cases';
import { mockJobRepository } from '@/infrastructure/job';

interface UseFeaturedJobsResult {
  jobs: JobDTO[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const deps = { jobRepository: mockJobRepository };

export function useFeaturedJobs(limit: number = 6): UseFeaturedJobsResult {
  const [jobs, setJobs] = useState<JobDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getFeaturedJobsUseCase(deps, limit);
      setJobs(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch featured jobs');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    isLoading,
    error,
    refetch: fetchJobs,
  };
}
