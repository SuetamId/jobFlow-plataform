'use client';

import { useFeaturedJobs } from '../hooks/useFeaturedJobs';
import { JobList } from './JobList';

interface FeaturedJobsProps {
  limit?: number;
  baseHref?: string;
}

export function FeaturedJobs({ limit = 6, baseHref = '/jobs' }: FeaturedJobsProps) {
  const { jobs, isLoading, error } = useFeaturedJobs(limit);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-foreground-secondary text-sm text-center">Failed to load featured jobs</p>
      </div>
    );
  }

  return (
    <JobList 
      jobs={jobs} 
      isLoading={isLoading} 
      baseHref={baseHref}
      emptyMessage="No featured jobs available"
    />
  );
}
