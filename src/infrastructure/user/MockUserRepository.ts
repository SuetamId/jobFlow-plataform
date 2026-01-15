import { UserRepository, UpdateUserProfileData } from '@/core/user/domain/repositories/UserRepository';
import { UserProfile } from '@/core/user/domain/entities/UserProfile';
import { mockUserProfiles, MockUserProfileData } from './mockData';

const SIMULATED_DELAY = 300;

function mapToUserProfileEntity(data: MockUserProfileData): UserProfile {
  return UserProfile.create({
    id: data.id,
    email: data.email,
    name: data.name,
    avatarUrl: data.avatarUrl,
    phone: data.phone,
    bio: data.bio,
    location: data.location,
    linkedinUrl: data.linkedinUrl,
    githubUrl: data.githubUrl,
    portfolioUrl: data.portfolioUrl,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  });
}

export class MockUserRepository implements UserRepository {
  async findById(id: string): Promise<UserProfile | null> {
    await this.simulateDelay();

    const profileData = mockUserProfiles.find(p => p.id === id);

    if (!profileData) {
      return null;
    }

    return mapToUserProfileEntity(profileData);
  }

  async update(id: string, data: UpdateUserProfileData): Promise<UserProfile> {
    await this.simulateDelay();

    const profileIndex = mockUserProfiles.findIndex(p => p.id === id);

    if (profileIndex === -1) {
      throw new Error('User profile not found');
    }

    const existingProfile = mockUserProfiles[profileIndex];
    const updatedProfile: MockUserProfileData = {
      ...existingProfile,
      name: data.name ?? existingProfile.name,
      phone: data.phone !== undefined ? data.phone : existingProfile.phone,
      bio: data.bio !== undefined ? data.bio : existingProfile.bio,
      location: data.location !== undefined ? data.location : existingProfile.location,
      linkedinUrl: data.linkedinUrl !== undefined ? data.linkedinUrl : existingProfile.linkedinUrl,
      githubUrl: data.githubUrl !== undefined ? data.githubUrl : existingProfile.githubUrl,
      portfolioUrl: data.portfolioUrl !== undefined ? data.portfolioUrl : existingProfile.portfolioUrl,
      updatedAt: new Date().toISOString(),
    };

    mockUserProfiles[profileIndex] = updatedProfile;

    return mapToUserProfileEntity(updatedProfile);
  }

  private simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  }
}

export const mockUserRepository = new MockUserRepository();
