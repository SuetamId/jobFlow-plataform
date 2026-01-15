export type ContractTypeValue = 'full-time' | 'part-time' | 'contractor' | 'internship' | 'temporary';

const CONTRACT_TYPE_LABELS: Record<ContractTypeValue, string> = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  contractor: 'Contractor',
  internship: 'Internship',
  temporary: 'Temporary',
};

export class ContractType {
  private readonly value: ContractTypeValue;

  private constructor(value: ContractTypeValue) {
    this.value = value;
  }

  static create(value: ContractTypeValue): ContractType {
    const validValues: ContractTypeValue[] = ['full-time', 'part-time', 'contractor', 'internship', 'temporary'];
    if (!validValues.includes(value)) {
      throw new Error(`Invalid contract type: ${value}`);
    }
    return new ContractType(value);
  }

  static fromString(value: string): ContractType {
    const normalized = value.toLowerCase().trim().replace(/\s+/g, '-');
    const mapping: Record<string, ContractTypeValue> = {
      'full-time': 'full-time',
      fulltime: 'full-time',
      full: 'full-time',
      'part-time': 'part-time',
      parttime: 'part-time',
      part: 'part-time',
      contractor: 'contractor',
      contract: 'contractor',
      freelance: 'contractor',
      internship: 'internship',
      intern: 'internship',
      temporary: 'temporary',
      temp: 'temporary',
    };
    const contractType = mapping[normalized];
    if (!contractType) {
      throw new Error(`Invalid contract type: ${value}`);
    }
    return new ContractType(contractType);
  }

  static fullTime(): ContractType {
    return new ContractType('full-time');
  }

  static partTime(): ContractType {
    return new ContractType('part-time');
  }

  static contractor(): ContractType {
    return new ContractType('contractor');
  }

  static internship(): ContractType {
    return new ContractType('internship');
  }

  static temporary(): ContractType {
    return new ContractType('temporary');
  }

  getValue(): ContractTypeValue {
    return this.value;
  }

  getLabel(): string {
    return CONTRACT_TYPE_LABELS[this.value];
  }

  isFullTime(): boolean {
    return this.value === 'full-time';
  }

  isPartTime(): boolean {
    return this.value === 'part-time';
  }

  isContractor(): boolean {
    return this.value === 'contractor';
  }

  isInternship(): boolean {
    return this.value === 'internship';
  }

  isTemporary(): boolean {
    return this.value === 'temporary';
  }

  isPermanent(): boolean {
    return this.value === 'full-time' || this.value === 'part-time';
  }

  equals(other: ContractType): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
