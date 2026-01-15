export interface RecruiterDTO {
  id: string;
  userId: string;
  companyId: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  phone: string | null;
  title: string | null;
  linkedinUrl: string | null;
  createdAt: string;
}
