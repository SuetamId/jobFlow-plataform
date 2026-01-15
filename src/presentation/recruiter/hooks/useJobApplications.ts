import { useState, useEffect, useCallback } from 'react';
import { ApplicationViewDTO } from '@/core/recruiter/application/dtos';
import { getJobApplicationsUseCase } from '@/core/recruiter/application/use-cases';
import { PaginatedResult } from '@/core/candidate/domain/repositories/ApplicationRepository';
import { mockJobRepository } from '@/infrastructure/job';
import { mockApplicationRepository, mockCandidateRepository } from '@/infrastructure/candidate';
import { mockRecruiterRepository } from '@/infrastructure/recruiter';

interface UseJobApplicationsOptions {
  recruiterId: string | null;
  jobId: string | null;
  page?: number;
  perPage?: number;
}

interface UseJobApplicationsResult {
  applications: ApplicationViewDTO[];
  pagination: Omit<PaginatedResult<ApplicationViewDTO>, 'items'> | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useJobApplications(options: UseJobApplicationsOptions): UseJobApplicationsResult {
  const { recruiterId, jobId, page = 1, perPage = 10 } = options;
  const [applications, setApplications] = useState<ApplicationViewDTO[]>([]);
  const [pagination, setPagination] = useState<Omit<PaginatedResult<ApplicationViewDTO>, 'items'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchApplications = useCallback(async () => {
    if (!recruiterId || !jobId) {
      setApplications([]);
      setPagination(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getJobApplicationsUseCase(
        {
          jobRepository: mockJobRepository,
          applicationRepository: mockApplicationRepository,
          candidateRepository: mockCandidateRepository,
          recruiterRepository: mockRecruiterRepository,
        },
        {
          recruiterId,
          jobId,
          pagination: { page, perPage },
        }
      );

      setApplications(result.items);
      setPagination({
        totalCount: result.totalCount,
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPreviousPage: result.hasPreviousPage,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch applications'));
    } finally {
      setIsLoading(false);
    }
  }, [recruiterId, jobId, page, perPage]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications,
    pagination,
    isLoading,
    error,
    refresh: fetchApplications,
  };
}
