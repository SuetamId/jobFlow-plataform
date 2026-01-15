'use client';

import { useState, FormEvent } from 'react';
import { Button, Input } from '@/presentation/components/ui';

interface JobSearchProps {
  initialSearch?: string;
  initialLocation?: string;
  onSearch: (search: string, location: string) => void;
}

export function JobSearch({ initialSearch = '', initialLocation = '', onSearch }: JobSearchProps) {
  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(search, location);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-tertiary pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <Input
          placeholder="Job title, keywords, or company"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-tertiary pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <Input
          placeholder="City, state, or remote"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="pl-9"
        />
      </div>
      <Button type="submit" variant="secondary" className="md:w-auto">
        Search
      </Button>
    </form>
  );
}
