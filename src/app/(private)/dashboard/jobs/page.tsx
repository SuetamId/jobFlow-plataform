'use client';

import { Card } from '@/presentation/components/ui';
import { JobList, JobSearch, JobFilters, Pagination, useJobs, useJobFilters } from '@/presentation/job';

export default function PrivateJobsPage() {
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
  } = useJobFilters();

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

  const handleSearch = (search: string, location: string) => {
    setSearch(search);
    setLocation(location);
  };

  return (
    <div className="space-y-6 mt-16">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Browse Jobs</h1>
        <p className="text-foreground-secondary">
          {totalCount > 0 ? `${totalCount} jobs found` : 'Search for your next opportunity'}
        </p>
      </div>

      <Card>
        <JobSearch
          initialSearch={filters.search}
          initialLocation={filters.location}
          onSearch={handleSearch}
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
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
        </aside>

        <div className="lg:col-span-3">
          {error ? (
            <div className="text-center py-12 text-error">
              {error}
            </div>
          ) : (
            <>
              <JobList jobs={jobs} isLoading={isLoading} baseHref="/dashboard/jobs" />
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
  );
}
