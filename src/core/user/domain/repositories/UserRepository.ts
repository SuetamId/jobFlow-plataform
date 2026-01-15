import { UserProfile } from '../entities/UserProfile';

export interface UpdateUserProfileData {
  name?: string;
  phone?: string | null;
  bio?: string | null;
  location?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  portfolioUrl?: string | null;
}

export interface UserRepository {
  findById(id: string): Promise<UserProfile | null>;
  update(id: string, data: UpdateUserProfileData): Promise<UserProfile>;
}
