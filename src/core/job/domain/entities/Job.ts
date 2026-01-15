import { Company } from './Company';
import { Location } from '../value-objects/Location';
import { SalaryRange } from '../value-objects/SalaryRange';
import { Seniority } from '../value-objects/Seniority';
import { ContractType } from '../value-objects/ContractType';
import { WorkModel } from '../value-objects/WorkModel';

export interface JobProps {
  id: string;
  externalId: string;
  company: Company;
  title: string;
  location: Location;
  contractTypes: ContractType[];
  workModel: WorkModel;
  publishedAt: Date;
  expiresAt: Date | null;
  description: string;
  applicationUrl: string;
  seniority: Seniority | null;
  salary: SalaryRange;
  isFeatured: boolean;
}

export class Job {
  private readonly props: JobProps;

  private constructor(props: JobProps) {
    this.props = props;
  }

  static create(props: JobProps): Job {
    if (!props.title || props.title.trim().length === 0) {
      throw new Error('Job title is required');
    }
    if (!props.description || props.description.trim().length === 0) {
      throw new Error('Job description is required');
    }
    return new Job(props);
  }

  get id(): string {
    return this.props.id;
  }

  get externalId(): string {
    return this.props.externalId;
  }

  get company(): Company {
    return this.props.company;
  }

  get title(): string {
    return this.props.title;
  }

  get location(): Location {
    return this.props.location;
  }

  get contractTypes(): ContractType[] {
    return [...this.props.contractTypes];
  }

  get workModel(): WorkModel {
    return this.props.workModel;
  }

  get publishedAt(): Date {
    return this.props.publishedAt;
  }

  get expiresAt(): Date | null {
    return this.props.expiresAt;
  }

  get description(): string {
    return this.props.description;
  }

  get applicationUrl(): string {
    return this.props.applicationUrl;
  }

  get seniority(): Seniority | null {
    return this.props.seniority;
  }

  get salary(): SalaryRange {
    return this.props.salary;
  }

  get isFeatured(): boolean {
    return this.props.isFeatured;
  }

  isExpired(referenceDate: Date = new Date()): boolean {
    if (!this.props.expiresAt) return false;
    return referenceDate > this.props.expiresAt;
  }

  isActive(referenceDate: Date = new Date()): boolean {
    return !this.isExpired(referenceDate);
  }

  canReceiveApplications(referenceDate: Date = new Date()): boolean {
    return this.isActive(referenceDate);
  }

  hasRemote(): boolean {
    return this.props.location.hasRemote || this.props.workModel.allowsRemoteWork();
  }

  getFormattedSalary(): string {
    return this.props.salary.format();
  }

  getFormattedLocation(): string {
    return this.props.location.format();
  }

  getSeniorityLabel(): string {
    return this.props.seniority?.getLabel() ?? 'Not specified';
  }

  getContractTypeLabels(): string[] {
    return this.props.contractTypes.map(ct => ct.getLabel());
  }

  matchesSearch(searchTerm: string): boolean {
    const term = searchTerm.toLowerCase();
    return (
      this.props.title.toLowerCase().includes(term) ||
      this.props.company.name.toLowerCase().includes(term) ||
      this.props.description.toLowerCase().includes(term)
    );
  }

  matchesLocation(locationTerm: string): boolean {
    return this.props.location.matchesSearch(locationTerm);
  }

  matchesSeniority(seniority: Seniority): boolean {
    if (!this.props.seniority) return false;
    return this.props.seniority.equals(seniority);
  }

  matchesContractType(contractType: ContractType): boolean {
    return this.props.contractTypes.some(ct => ct.equals(contractType));
  }
}
