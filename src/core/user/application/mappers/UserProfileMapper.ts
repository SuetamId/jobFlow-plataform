import { UserProfile } from '../../domain/entities/UserProfile';
import { UserProfileDTO } from '../dtos/UserProfileDTO';

export function mapUserProfileToDTO(profile: UserProfile): UserProfileDTO {
  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    avatarUrl: profile.avatarUrl,
    phone: profile.phone,
    bio: profile.bio,
    location: profile.location,
    linkedinUrl: profile.linkedinUrl,
    githubUrl: profile.githubUrl,
    portfolioUrl: profile.portfolioUrl,
    createdAt: profile.createdAt.toISOString(),
    updatedAt: profile.updatedAt.toISOString(),
  };
}
