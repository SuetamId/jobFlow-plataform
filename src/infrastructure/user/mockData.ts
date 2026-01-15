export interface MockUserProfileData {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  phone: string | null;
  bio: string | null;
  location: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  portfolioUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export const mockUserProfiles: MockUserProfileData[] = [
  {
    id: 'user-1',
    email: 'john@example.com',
    name: 'John Doe',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    phone: '+1 555-123-4567',
    bio: 'Senior Software Engineer with 10+ years of experience in building scalable web applications.',
    location: 'San Francisco, CA',
    linkedinUrl: 'https://linkedin.com/in/johndoe',
    githubUrl: 'https://github.com/johndoe',
    portfolioUrl: 'https://johndoe.dev',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-10T15:30:00Z',
  },
  {
    id: 'user-2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    phone: '+1 555-987-6543',
    bio: 'Frontend Developer passionate about creating beautiful and accessible user interfaces.',
    location: 'New York, NY',
    linkedinUrl: 'https://linkedin.com/in/janesmith',
    githubUrl: 'https://github.com/janesmith',
    portfolioUrl: null,
    createdAt: '2024-01-05T14:30:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
  },
];
