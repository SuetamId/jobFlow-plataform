import { SeniorityLevel } from '../../domain/value-objects/Seniority';
import { ContractTypeValue } from '../../domain/value-objects/ContractType';
import { WorkModelType } from '../../domain/value-objects/WorkModel';

export interface JobFiltersDTO {
  search?: string;
  location?: string;
  hasRemote?: boolean;
  seniority?: SeniorityLevel;
  contractType?: ContractTypeValue;
  workModel?: WorkModelType;
  companyId?: string;
  page?: number;
  perPage?: number;
  sortBy?: 'publishedAt' | 'salary' | 'title';
  sortDirection?: 'asc' | 'desc';
}
