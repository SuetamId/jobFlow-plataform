'use client';

import { Card } from '@/presentation/components/ui';

interface RecruiterStatsProps {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingReview: number;
}

export function RecruiterStats({
  totalJobs,
  activeJobs,
  totalApplications,
  pendingReview,
}: RecruiterStatsProps) {
  const stats = [
    { label: 'Active Jobs', value: activeJobs, icon: '💼' },
    { label: 'Total Jobs', value: totalJobs, icon: '📋' },
    { label: 'Applications', value: totalApplications, icon: '📨' },
    { label: 'Pending Review', value: pendingReview, icon: '⏳' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(stat => (
        <Card key={stat.label}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-foreground-secondary">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
