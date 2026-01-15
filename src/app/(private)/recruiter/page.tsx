'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Button } from '@/presentation/components/ui';
import { useAuth } from '@/presentation/auth';
import { useRecruiter, useCompanyJobs, RecruiterStats, RecruiterJobCard } from '@/presentation/recruiter';

export default function RecruiterDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { recruiter, isLoading: recruiterLoading } = useRecruiter();
  const { jobs, isLoading: jobsLoading } = useCompanyJobs({
    recruiterId: recruiter?.id ?? null,
    perPage: 5
  });

  useEffect(() => {
    if (!authLoading && user?.role !== 'recruiter') {
      router.replace('/dashboard');
    }
  }, [user, authLoading, router]);

  if (authLoading || user?.role !== 'recruiter') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
      </div>
    );
  }

  const isLoading = recruiterLoading || jobsLoading;
  const activeJobs = jobs.filter(j => j.isActive).length;
  const totalApplications = jobs.reduce((sum, j) => sum + j.applicationCount, 0);

  return (
    <>
      <div className="space-y-6 mt-16">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Recruiter Dashboard
            </h1>
            <p className="text-foreground-secondary">
              Manage your job postings and review applications
            </p>
          </div>
          <Link href="/recruiter/jobs/new">
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post New Job
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
          </div>
        ) : (
          <>
            <RecruiterStats
              totalJobs={jobs.length}
              activeJobs={activeJobs}
              totalApplications={totalApplications}
              pendingReview={Math.floor(totalApplications * 0.3)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Recent Job Postings</h2>
                    <Link href="/recruiter/jobs">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </div>

                  {jobs.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-foreground-secondary mb-4">No job postings yet</p>
                      <Link href="/recruiter/jobs/new">
                        <Button variant="outline">Create Your First Job</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {jobs.slice(0, 3).map(job => (
                        <RecruiterJobCard key={job.id} job={job} />
                      ))}
                    </div>
                  )}
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
                  <div className="space-y-2">
                    <Link href="/recruiter/jobs/new" className="block">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Post New Job
                      </Button>
                    </Link>
                    <Link href="/recruiter/jobs" className="block">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Manage Jobs
                      </Button>
                    </Link>
                    <Link href="/dashboard/settings" className="block">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Button>
                    </Link>
                  </div>
                </Card>

                {recruiter && (
                  <Card>
                    <h2 className="text-lg font-semibold text-foreground mb-4">Your Profile</h2>
                    <div className="flex items-center gap-3 mb-4">
                      {recruiter.avatarUrl ? (
                        <img
                          src={recruiter.avatarUrl}
                          alt={recruiter.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                          <span className="text-secondary font-semibold">
                            {recruiter.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-foreground">{recruiter.name}</p>
                        <p className="text-sm text-foreground-secondary">{recruiter.title}</p>
                      </div>
                    </div>
                    <Link href="/dashboard/profile">
                      <Button variant="outline" size="sm" className="w-full">
                        Edit Profile
                      </Button>
                    </Link>
                  </Card>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
