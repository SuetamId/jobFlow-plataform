'use client';

import { UserProfileDTO } from '@/core/user/application/dtos';
import { Card, Badge } from '@/presentation/components/ui';

interface UserProfileProps {
  profile: UserProfileDTO;
}

export function UserProfile({ profile }: UserProfileProps) {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-background-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-foreground-secondary">
                {profile.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
            <p className="text-foreground-secondary">{profile.email}</p>

            {profile.location && (
              <div className="flex items-center gap-2 mt-2 text-sm text-foreground-secondary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{profile.location}</span>
              </div>
            )}
          </div>
        </div>

        {profile.bio && (
          <div className="mt-6">
            <h2 className="text-sm font-medium text-foreground-secondary mb-2">About</h2>
            <p className="text-foreground">{profile.bio}</p>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-foreground mb-4">Contact Information</h2>
        <div className="space-y-3">
          <InfoRow label="Email" value={profile.email} />
          {profile.phone && <InfoRow label="Phone" value={profile.phone} />}
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-foreground mb-4">Links</h2>
        <div className="flex flex-wrap gap-3">
          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge variant="outline">LinkedIn</Badge>
            </a>
          )}
          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge variant="outline">GitHub</Badge>
            </a>
          )}
          {profile.portfolioUrl && (
            <a
              href={profile.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge variant="outline">Portfolio</Badge>
            </a>
          )}
          {!profile.linkedinUrl && !profile.githubUrl && !profile.portfolioUrl && (
            <p className="text-sm text-foreground-secondary">No links added yet</p>
          )}
        </div>
      </Card>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground-secondary">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
