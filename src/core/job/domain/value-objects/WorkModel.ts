export type WorkModelType = 'remote' | 'hybrid' | 'onsite';

const WORK_MODEL_LABELS: Record<WorkModelType, string> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'On-site',
};

export class WorkModel {
  private readonly value: WorkModelType;

  private constructor(value: WorkModelType) {
    this.value = value;
  }

  static create(value: WorkModelType): WorkModel {
    const validValues: WorkModelType[] = ['remote', 'hybrid', 'onsite'];
    if (!validValues.includes(value)) {
      throw new Error(`Invalid work model: ${value}`);
    }
    return new WorkModel(value);
  }

  static fromString(value: string): WorkModel {
    const normalized = value.toLowerCase().trim();
    const mapping: Record<string, WorkModelType> = {
      remote: 'remote',
      hybrid: 'hybrid',
      onsite: 'onsite',
      'on-site': 'onsite',
      'on site': 'onsite',
      office: 'onsite',
    };
    const workModel = mapping[normalized];
    if (!workModel) {
      throw new Error(`Invalid work model: ${value}`);
    }
    return new WorkModel(workModel);
  }

  static remote(): WorkModel {
    return new WorkModel('remote');
  }

  static hybrid(): WorkModel {
    return new WorkModel('hybrid');
  }

  static onsite(): WorkModel {
    return new WorkModel('onsite');
  }

  getValue(): WorkModelType {
    return this.value;
  }

  getLabel(): string {
    return WORK_MODEL_LABELS[this.value];
  }

  isRemote(): boolean {
    return this.value === 'remote';
  }

  isHybrid(): boolean {
    return this.value === 'hybrid';
  }

  isOnsite(): boolean {
    return this.value === 'onsite';
  }

  allowsRemoteWork(): boolean {
    return this.value === 'remote' || this.value === 'hybrid';
  }

  equals(other: WorkModel): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
