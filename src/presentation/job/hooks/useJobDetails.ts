'use client';

import { useEffect, useState, useCallback } from 'react';
import { JobDTO } from '@/core/job/application/dtos';
import { getJobByIdUseCase } from '@/core/job/application/use-cases';
import { mockJobRepository } from '@/infrastructure/job';

interface UseJobDetailsResult {
  job: JobDTO | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const deps = { jobRepository: mockJobRepository };

export function useJobDetails(id: string): UseJobDetailsResult {
  const [job, setJob] = useState<JobDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJob = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getJobByIdUseCase(deps, id);
      setJob(result);
      
      if (!result) {
        setError('Job not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch job');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  return {
    job,
    isLoading,
    error,
    refetch: fetchJob,
  };
}
