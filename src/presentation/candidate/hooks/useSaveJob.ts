'use client';

import { useState, useCallback } from 'react';
import { 
  saveJobUseCase, 
  unsaveJobUseCase, 
  isJobSavedUseCase 
} from '@/core/candidate/application/use-cases';
import { 
  mockCandidateRepository, 
  mockSavedJobRepository 
} from '@/infrastructure/candidate';
import { mockJobRepository } from '@/infrastructure/job';

interface UseSaveJobResult {
  isSaved: boolean;
  isLoading: boolean;
  error: string | null;
  saveJob: () => Promise<void>;
  unsaveJob: () => Promise<void>;
  toggleSave: () => Promise<void>;
  checkIfSaved: () => Promise<void>;
}

const deps = {
  candidateRepository: mockCandidateRepository,
  savedJobRepository: mockSavedJobRepository,
  jobRepository: mockJobRepository,
};

export function useSaveJob(candidateId: string, jobId: string): UseSaveJobResult {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkIfSaved = useCallback(async () => {
    try {
      const saved = await isJobSavedUseCase(deps, candidateId, jobId);
      setIsSaved(saved);
    } catch (err) {
      console.error('Failed to check if job is saved:', err);
    }
  }, [candidateId, jobId]);

  const saveJob = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await saveJobUseCase(deps, { candidateId, jobId });
      setIsSaved(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save job';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [candidateId, jobId]);

  const unsaveJob = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await unsaveJobUseCase(deps, candidateId, jobId);
      setIsSaved(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to unsave job';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [candidateId, jobId]);

  const toggleSave = useCallback(async () => {
    if (isSaved) {
      await unsaveJob();
    } else {
      await saveJob();
    }
  }, [isSaved, saveJob, unsaveJob]);

  return {
    isSaved,
    isLoading,
    error,
    saveJob,
    unsaveJob,
    toggleSave,
    checkIfSaved,
  };
}
