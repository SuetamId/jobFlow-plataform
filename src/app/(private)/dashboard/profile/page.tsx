'use client';

import Link from 'next/link';
import { Button, Skeleton } from '@/presentation/components/ui';
import { UserProfile, useUserProfile } from '@/presentation/user';

export default function ProfilePage() {
  const { profile, isLoading, error } = useUserProfile();

  if (isLoading) {
    return (
      <div className="max-w-2xl space-y-6">
        <Skeleton className="h-48" />
        <Skeleton className="h-32" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-2xl text-center py-12">
        <h1 className="text-2xl font-bold text-foreground mb-4">Profile not found</h1>
        <p className="text-foreground-secondary mb-6">
          Unable to load your profile. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6 mt-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
          <p className="text-foreground-secondary">View and manage your profile information</p>
        </div>
        <Link href="/dashboard/settings">
          <Button variant="outline">Edit Profile</Button>
        </Link>
      </div>

      <UserProfile profile={profile} />
    </div>
  );
}
