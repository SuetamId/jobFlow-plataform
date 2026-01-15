'use client';

import { Skeleton } from '@/presentation/components/ui';
import { ProfileSettings, useUserProfile } from '@/presentation/user';

export default function SettingsPage() {
  const { profile, isLoading, error, updateProfile } = useUserProfile();

  if (isLoading) {
    return (
      <div className="max-w-2xl space-y-6">
        <Skeleton className="h-64" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-2xl text-center py-12">
        <h1 className="text-2xl font-bold text-foreground mb-4">Settings unavailable</h1>
        <p className="text-foreground-secondary mb-6">
          Unable to load your settings. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6 mt-16">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-foreground-secondary">Manage your account settings and preferences</p>
      </div>

      <ProfileSettings profile={profile} onSave={updateProfile} />
    </div>
  );
}
