export interface MockRecruiterData {
  id: string;
  user_id: string;
  company_id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  phone: string | null;
  title: string | null;
  linkedin_url: string | null;
  created_at: string;
  updated_at: string;
}

export const mockRecruiters: MockRecruiterData[] = [
  {
    id: 'rec-001',
    user_id: 'user-3',
    company_id: '1001',
    email: 'sarah@techflow.io',
    name: 'Sarah Johnson',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    phone: '+1 555-987-6543',
    title: 'Senior Technical Recruiter',
    linkedin_url: 'https://linkedin.com/in/sarahjohnson',
    created_at: '2023-11-15T09:00:00Z',
    updated_at: '2024-01-10T14:30:00Z',
  },
  {
    id: 'rec-002',
    user_id: 'user-4',
    company_id: '6348',
    email: 'mike@janestreet.com',
    name: 'Mike Chen',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    phone: '+1 555-234-5678',
    title: 'Head of Engineering Recruitment',
    linkedin_url: 'https://linkedin.com/in/mikechen',
    created_at: '2023-10-20T11:30:00Z',
    updated_at: '2024-01-08T16:00:00Z',
  },
];

let recruiterIdCounter = 3;

export function generateRecruiterId(): string {
  return `rec-${String(recruiterIdCounter++).padStart(3, '0')}`;
}
