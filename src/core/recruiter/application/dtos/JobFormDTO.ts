import { SeniorityLevel } from '@/core/job/domain/value-objects/Seniority';
import { ContractTypeValue } from '@/core/job/domain/value-objects/ContractType';
import { WorkModelType } from '@/core/job/domain/value-objects/WorkModel';

export interface CreateJobDTO {
  companyId: string;
  title: string;
  description: string;
  city: string | null;
  state: string | null;
  country: string | null;
  isRemote: boolean;
  workModel: WorkModelType;
  contractTypes: ContractTypeValue[];
  seniority: SeniorityLevel | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: 'USD' | 'EUR' | 'GBP' | 'BRL' | 'CAD' | null;
  applicationUrl: string;
  expiresAt: string | null;
}

export interface UpdateJobDTO extends Partial<CreateJobDTO> {
  id: string;
}

export interface JobSummaryDTO {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string | null;
  location: string;
  workModel: string;
  seniority: string | null;
  salary: string;
  publishedAt: string;
  expiresAt: string | null;
  isActive: boolean;
  applicationCount: number;
}
