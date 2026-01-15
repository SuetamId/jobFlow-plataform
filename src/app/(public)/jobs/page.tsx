'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Card } from '@/presentation/components/ui';
import { JobList, JobSearch, JobFilters, Pagination, useJobs, useJobFilters } from '@/presentation/job';

function JobsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialLocation = searchParams.get('location') || '';

  const {
    filters,
    setSearch,
    setLocation,
    setHasRemote,
    setSeniority,
    setContractType,
    setWorkModel,
    setPage,
    resetFilters,
  } = useJobFilters({
    search: initialSearch,
    location: initialLocation,
  });

  const {
    jobs,
    totalCount,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    error,
  } = useJobs(filters);

  useEffect(() => {
    if (initialSearch) setSearch(initialSearch);
    if (initialLocation) setLocation(initialLocation);
  }, [initialSearch, initialLocation]);

  const handleSearch = (search: string, location: string) => {
    setSearch(search);
    setLocation(location);
  };

  return (
    <div className="py-8 md:py-10">
      <div className="container-app">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Browse Jobs</h1>
          <p className="text-foreground-secondary mt-1">
            {isLoading 
              ? 'Searching...'
              : totalCount > 0 
                ? `${totalCount.toLocaleString()} jobs found` 
                : 'Find your next opportunity'
            }
          </p>
        </div>

        <div className="mb-8">
          <JobSearch
            initialSearch={filters.search}
            initialLocation={filters.location}
            onSearch={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Card>
                <JobFilters
                  hasRemote={filters.hasRemote}
                  seniority={filters.seniority}
                  contractType={filters.contractType}
                  workModel={filters.workModel}
                  onRemoteChange={setHasRemote}
                  onSeniorityChange={setSeniority}
                  onContractTypeChange={setContractType}
                  onWorkModelChange={setWorkModel}
                  onReset={resetFilters}
                />
              </Card>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {error ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-foreground font-medium text-center">Something went wrong</p>
                <p className="text-foreground-secondary text-sm text-center mt-1">{error}</p>
              </div>
            ) : (
              <>
                <JobList jobs={jobs} isLoading={isLoading} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  hasNextPage={hasNextPage}
                  hasPreviousPage={hasPreviousPage}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function JobsPageLoading() {
  return (
    <div className="py-8 md:py-10">
      <div className="container-app">
        <div className="mb-8">
          <div className="h-8 w-48 bg-background-secondary rounded animate-pulse" />
          <div className="h-4 w-32 bg-background-secondary rounded animate-pulse mt-2" />
        </div>
        <div className="mb-8">
          <div className="h-14 bg-background-secondary rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="h-64 bg-background-secondary rounded-lg animate-pulse" />
          </div>
          <div className="lg:col-span-3 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-background-secondary rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<JobsPageLoading />}>
      <JobsContent />
    </Suspense>
  );
}
