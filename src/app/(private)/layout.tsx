'use client';

import { ReactNode } from 'react';
import { AuthGuard } from '@/presentation/auth';
import { PrivateHeader, Sidebar } from '@/presentation/components/layout';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background-secondary">
        <PrivateHeader />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 pt-16 p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
