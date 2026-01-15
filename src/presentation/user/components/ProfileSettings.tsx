'use client';

import { useState, FormEvent } from 'react';
import { UserProfileDTO, UpdateUserProfileDTO } from '@/core/user/application/dtos';
import { Button, Input, Card } from '@/presentation/components/ui';

interface ProfileSettingsProps {
  profile: UserProfileDTO;
  onSave: (data: UpdateUserProfileDTO) => Promise<void>;
}

export function ProfileSettings({ profile, onSave }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    name: profile.name,
    phone: profile.phone || '',
    bio: profile.bio || '',
    location: profile.location || '',
    linkedinUrl: profile.linkedinUrl || '',
    githubUrl: profile.githubUrl || '',
    portfolioUrl: profile.portfolioUrl || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await onSave({
        name: formData.name,
        phone: formData.phone || null,
        bio: formData.bio || null,
        location: formData.location || null,
        linkedinUrl: formData.linkedinUrl || null,
        githubUrl: formData.githubUrl || null,
        portfolioUrl: formData.portfolioUrl || null,
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="p-3 bg-success/10 border border-success/20 rounded-md text-success text-sm">
          Settings saved successfully!
        </div>
      )}

      {error && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md text-error text-sm">
          {error}
        </div>
      )}

      <Card>
        <h2 className="text-lg font-semibold text-foreground mb-4">Personal Information</h2>
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={e => handleChange('phone', e.target.value)}
            placeholder="+1 555-123-4567"
          />
          <Input
            label="Location"
            value={formData.location}
            onChange={e => handleChange('location', e.target.value)}
            placeholder="City, State"
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={e => handleChange('bio', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-foreground-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-foreground mb-4">Social Links</h2>
        <div className="space-y-4">
          <Input
            label="LinkedIn URL"
            type="url"
            value={formData.linkedinUrl}
            onChange={e => handleChange('linkedinUrl', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
          />
          <Input
            label="GitHub URL"
            type="url"
            value={formData.githubUrl}
            onChange={e => handleChange('githubUrl', e.target.value)}
            placeholder="https://github.com/yourusername"
          />
          <Input
            label="Portfolio URL"
            type="url"
            value={formData.portfolioUrl}
            onChange={e => handleChange('portfolioUrl', e.target.value)}
            placeholder="https://yourportfolio.com"
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" variant="secondary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
