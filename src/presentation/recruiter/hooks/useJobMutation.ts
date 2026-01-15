import { useState, useCallback } from 'react';
import { CreateJobDTO, UpdateJobDTO, JobSummaryDTO } from '@/core/recruiter/application/dtos';
import { createJobUseCase, updateJobUseCase } from '@/core/recruiter/application/use-cases';
import { mockJobRepository } from '@/infrastructure/job';
import { mockApplicationRepository } from '@/infrastructure/candidate';
import { mockRecruiterRepository } from '@/infrastructure/recruiter';

interface UseJobMutationResult {
  createJob: (data: CreateJobDTO) => Promise<JobSummaryDTO>;
  updateJob: (data: UpdateJobDTO) => Promise<JobSummaryDTO>;
  isLoading: boolean;
  error: Error | null;
}

export function useJobMutation(recruiterId: string | null): UseJobMutationResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deps = {
    jobRepository: mockJobRepository,
    applicationRepository: mockApplicationRepository,
    recruiterRepository: mockRecruiterRepository,
  };

  const createJob = useCallback(async (data: CreateJobDTO): Promise<JobSummaryDTO> => {
    if (!recruiterId) {
      throw new Error('Recruiter not found');
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await createJobUseCase(deps, {
        recruiterId,
        jobData: data,
      });
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create job');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [recruiterId]);

  const updateJob = useCallback(async (data: UpdateJobDTO): Promise<JobSummaryDTO> => {
    if (!recruiterId) {
      throw new Error('Recruiter not found');
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await updateJobUseCase(deps, {
        recruiterId,
        jobData: data,
      });
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update job');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [recruiterId]);

  return {
    createJob,
    updateJob,
    isLoading,
    error,
  };
}
