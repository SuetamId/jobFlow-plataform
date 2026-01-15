'use client';

import Link from 'next/link';
import { Button } from '../ui/Button';
import { useAuth } from '@/presentation/auth/hooks/useAuth';

export function PublicHeader() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-app h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Job<span className="text-secondary">Flow</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-foreground-secondary hover:text-foreground rounded-lg hover:bg-background-secondary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/jobs"
                className="px-3 py-2 text-sm font-medium text-foreground-secondary hover:text-foreground rounded-lg hover:bg-background-secondary transition-colors"
              >
                Browse Jobs
              </Link>
              <Link
                href="/companies"
                className="px-3 py-2 text-sm font-medium text-foreground-secondary hover:text-foreground rounded-lg hover:bg-background-secondary transition-colors"
              >
                Companies
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="w-20 h-8 bg-background-secondary rounded-lg animate-shimmer" />
            ) : isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="secondary" size="sm">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
