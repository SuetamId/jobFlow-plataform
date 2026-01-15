'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Button } from '@/presentation/components/ui';
import { FeaturedJobs } from '@/presentation/job';
import { useAuth } from '@/presentation/auth';

const QUICK_STATS = [
  { label: 'Applications Sent', value: '12', change: '+3 this week' },
  { label: 'Profile Views', value: '48', change: '+15 this week' },
  { label: 'Saved Jobs', value: '8', change: '2 new matches' },
  { label: 'Interviews', value: '3', change: '1 upcoming' },
];

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role === 'recruiter') {
      router.replace('/recruiter');
    }
  }, [user, isLoading, router]);

  if (isLoading || user?.role === 'recruiter') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-16">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.name?.split(' ')[0] || 'there'}!
        </h1>
        <p className="text-foreground-secondary">
          Here&apos;s what&apos;s happening with your job search
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_STATS.map(stat => (
          <Card key={stat.label}>
            <p className="text-sm text-foreground-secondary">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
            <p className="text-xs text-secondary mt-1">{stat.change}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recommended Jobs</h2>
              <Link href="/dashboard/jobs">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <FeaturedJobs limit={3} baseHref="/dashboard/jobs" />
          </Card>
        </div>

        <div className="space-y-6 mt-16">
          <Card>
            <h2 className="text-lg font-semibold text-foreground mb-4">Profile Completion</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground-secondary">Profile</span>
                <span className="text-sm font-medium text-foreground">75%</span>
              </div>
              <div className="w-full bg-background-secondary rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '75%' }} />
              </div>
              <Link href="/dashboard/settings">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Complete Profile
                </Button>
              </Link>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/dashboard/jobs" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Jobs
                </Button>
              </Link>
              <Link href="/dashboard/profile" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  View Profile
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
        </div>
      </div>
    </div>
  );
}
