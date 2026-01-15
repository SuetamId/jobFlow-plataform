'use client';

import Link from 'next/link';
import { Button, Card } from '@/presentation/components/ui';
import { FeaturedJobs, JobSearch } from '@/presentation/job';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const METRICS = [
  { label: 'Active Jobs', value: '10,000+', icon: '💼' },
  { label: 'Companies', value: '2,500+', icon: '🏢' },
  { label: 'Job Seekers', value: '50,000+', icon: '👥' },
  { label: 'Placements', value: '8,000+', icon: '🎯' },
];

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (searchTerm: string, locationTerm: string) => {
    setSearch(searchTerm);
    setLocation(locationTerm);
    
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (locationTerm) params.set('location', locationTerm);
    
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/5 via-background to-background py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(13,148,136,0.08),transparent_50%)]" />
        <div className="container-app relative">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Find Your Dream Job
              <span className="text-secondary"> Today</span>
            </h1>
            <p className="text-lg text-foreground-secondary mt-4 leading-relaxed">
              Discover thousands of opportunities from top companies worldwide.
              Your next career move starts here.
            </p>
            
            <div className="mt-8 bg-background p-4 md:p-5 rounded-2xl shadow-lg border border-border">
              <JobSearch 
                initialSearch={search}
                initialLocation={location}
                onSearch={handleSearch} 
              />
            </div>

            <p className="mt-4 text-sm text-foreground-tertiary">
              Popular: React, Node.js, Remote, Full-time
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background-secondary border-y border-border">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {METRICS.map(metric => (
              <div key={metric.label} className="text-center py-4">
                <p className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{metric.value}</p>
                <p className="text-sm text-foreground-secondary mt-1">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Featured Jobs</h2>
              <p className="text-foreground-secondary mt-1">
                Hand-picked opportunities from top companies
              </p>
            </div>
            <Link href="/jobs">
              <Button variant="outline">
                View All Jobs
                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
          
          <FeaturedJobs limit={6} />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary">
        <div className="container-app">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-inverse tracking-tight">
              Ready to Take the Next Step?
            </h2>
            <p className="text-base text-foreground-inverse/80 mt-3 leading-relaxed">
              Create your profile and get discovered by top employers.
              Join thousands of professionals who found their dream job.
            </p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <Link href="/register">
                <Button variant="secondary" size="lg">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/jobs">
                <Button variant="ghost" size="lg" className="text-foreground-inverse hover:bg-foreground-inverse/10">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
