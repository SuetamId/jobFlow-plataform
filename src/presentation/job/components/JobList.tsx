'use client';

import { JobDTO } from '@/core/job/application/dtos';
import { JobCard } from './JobCard';
import { SkeletonCard } from '@/presentation/components/ui';

interface JobListProps {
  jobs: JobDTO[];
  isLoading?: boolean;
  emptyMessage?: string;
  baseHref?: string;
}

export function JobList({
  jobs,
  isLoading = false,
  emptyMessage = 'No jobs found',
  baseHref = '/jobs'
}: JobListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-background-secondary flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-foreground-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-foreground-secondary text-center font-medium">{emptyMessage}</p>
        <p className="text-foreground-tertiary text-sm text-center mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} href={`${baseHref}/${job.id}`} />
      ))}
    </div>
  );
}
