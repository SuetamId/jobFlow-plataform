import { useState, useEffect, useCallback } from 'react';
import { JobSummaryDTO } from '@/core/recruiter/application/dtos';
import { getCompanyJobsUseCase } from '@/core/recruiter/application/use-cases';
import { PaginatedResult } from '@/core/job/domain/repositories/JobRepository';
import { mockJobRepository } from '@/infrastructure/job';
import { mockApplicationRepository } from '@/infrastructure/candidate';
import { mockRecruiterRepository } from '@/infrastructure/recruiter';

interface UseCompanyJobsOptions {
  recruiterId: string | null;
  page?: number;
  perPage?: number;
}

interface UseCompanyJobsResult {
  jobs: JobSummaryDTO[];
  pagination: Omit<PaginatedResult<JobSummaryDTO>, 'items'> | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useCompanyJobs(options: UseCompanyJobsOptions): UseCompanyJobsResult {
  const { recruiterId, page = 1, perPage = 10 } = options;
  const [jobs, setJobs] = useState<JobSummaryDTO[]>([]);
  const [pagination, setPagination] = useState<Omit<PaginatedResult<JobSummaryDTO>, 'items'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchJobs = useCallback(async () => {
    if (!recruiterId) {
      setJobs([]);
      setPagination(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getCompanyJobsUseCase(
        {
          jobRepository: mockJobRepository,
          applicationRepository: mockApplicationRepository,
          recruiterRepository: mockRecruiterRepository,
        },
        {
          recruiterId,
          pagination: { page, perPage },
        }
      );

      setJobs(result.items);
      setPagination({
        totalCount: result.totalCount,
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPreviousPage: result.hasPreviousPage,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch jobs'));
    } finally {
      setIsLoading(false);
    }
  }, [recruiterId, page, perPage]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    pagination,
    isLoading,
    error,
    refresh: fetchJobs,
  };
}
