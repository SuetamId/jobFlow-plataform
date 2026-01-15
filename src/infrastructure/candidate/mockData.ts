import { ApplicationStatus } from '@/core/candidate/domain/entities/Application';

export interface MockCandidateData {
  id: string;
  user_id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  phone: string | null;
  bio: string | null;
  location: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  resume_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface MockApplicationData {
  id: string;
  candidate_id: string;
  job_id: string;
  status: ApplicationStatus;
  cover_letter: string | null;
  resume_url: string | null;
  applied_at: string;
  updated_at: string;
}

export interface MockSavedJobData {
  id: string;
  candidate_id: string;
  job_id: string;
  notes: string | null;
  saved_at: string;
}

export const mockCandidates: MockCandidateData[] = [
  {
    id: 'cand-001',
    user_id: 'user-001',
    email: 'john.doe@example.com',
    name: 'John Doe',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe',
    phone: '+1 555-123-4567',
    bio: 'Experienced software developer with 5+ years in React and TypeScript.',
    location: 'San Francisco, CA',
    linkedin_url: 'https://linkedin.com/in/johndoe',
    github_url: 'https://github.com/johndoe',
    portfolio_url: 'https://johndoe.dev',
    resume_url: 'https://example.com/resumes/johndoe.pdf',
    created_at: '2023-06-15T10:00:00Z',
    updated_at: '2024-01-10T14:30:00Z',
  },
  {
    id: 'cand-002',
    user_id: 'user-002',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JaneSmith',
    phone: null,
    bio: 'Frontend developer passionate about creating accessible web experiences.',
    location: 'New York, NY',
    linkedin_url: 'https://linkedin.com/in/janesmith',
    github_url: null,
    portfolio_url: null,
    resume_url: null,
    created_at: '2023-09-20T08:00:00Z',
    updated_at: '2024-01-05T11:20:00Z',
  },
];

export const mockApplications: MockApplicationData[] = [
  {
    id: 'app-001',
    candidate_id: 'cand-001',
    job_id: '1488423',
    status: 'reviewing',
    cover_letter: 'I am very interested in this position and believe my experience aligns well with your requirements.',
    resume_url: 'https://example.com/resumes/johndoe.pdf',
    applied_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-12T14:00:00Z',
  },
  {
    id: 'app-002',
    candidate_id: 'cand-001',
    job_id: '2231401',
    status: 'pending',
    cover_letter: null,
    resume_url: 'https://example.com/resumes/johndoe.pdf',
    applied_at: '2024-01-11T15:30:00Z',
    updated_at: '2024-01-11T15:30:00Z',
  },
  {
    id: 'app-003',
    candidate_id: 'cand-002',
    job_id: '2231403',
    status: 'interviewed',
    cover_letter: 'My passion for UI/UX makes this role perfect for me.',
    resume_url: null,
    applied_at: '2024-01-08T10:00:00Z',
    updated_at: '2024-01-14T16:00:00Z',
  },
];

export const mockSavedJobs: MockSavedJobData[] = [
  {
    id: 'saved-001',
    candidate_id: 'cand-001',
    job_id: '1200356',
    notes: 'Great salary, need to prepare for technical interview.',
    saved_at: '2024-01-09T08:00:00Z',
  },
  {
    id: 'saved-002',
    candidate_id: 'cand-001',
    job_id: '2231406',
    notes: null,
    saved_at: '2024-01-10T12:00:00Z',
  },
  {
    id: 'saved-003',
    candidate_id: 'cand-002',
    job_id: '2231405',
    notes: 'Good entry-level position.',
    saved_at: '2024-01-07T09:30:00Z',
  },
];

let applicationIdCounter = 4;
let savedJobIdCounter = 4;

export function generateApplicationId(): string {
  return `app-${String(applicationIdCounter++).padStart(3, '0')}`;
}

export function generateSavedJobId(): string {
  return `saved-${String(savedJobIdCounter++).padStart(3, '0')}`;
}
