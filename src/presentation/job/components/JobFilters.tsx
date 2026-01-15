'use client';

import { Button } from '@/presentation/components/ui';
import { SeniorityLevel } from '@/core/job/domain/value-objects/Seniority';
import { ContractTypeValue } from '@/core/job/domain/value-objects/ContractType';
import { WorkModelType } from '@/core/job/domain/value-objects/WorkModel';

interface JobFiltersProps {
  hasRemote?: boolean;
  seniority?: SeniorityLevel;
  contractType?: ContractTypeValue;
  workModel?: WorkModelType;
  onRemoteChange: (value: boolean | undefined) => void;
  onSeniorityChange: (value: SeniorityLevel | undefined) => void;
  onContractTypeChange: (value: ContractTypeValue | undefined) => void;
  onWorkModelChange: (value: WorkModelType | undefined) => void;
  onReset: () => void;
}

const SENIORITY_LEVELS: { value: SeniorityLevel; label: string }[] = [
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid-Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'executive', label: 'Executive' },
];

const CONTRACT_TYPES: { value: ContractTypeValue; label: string }[] = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'internship', label: 'Internship' },
  { value: 'temporary', label: 'Temporary' },
];

const WORK_MODELS: { value: WorkModelType; label: string }[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
];

export function JobFilters({
  hasRemote,
  seniority,
  contractType,
  workModel,
  onRemoteChange,
  onSeniorityChange,
  onContractTypeChange,
  onWorkModelChange,
  onReset,
}: JobFiltersProps) {
  const hasActiveFilters = hasRemote !== undefined || seniority || contractType || workModel;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-7 px-2 text-xs">
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <FilterSection label="Work Model">
          {WORK_MODELS.map(model => (
            <FilterChip
              key={model.value}
              active={workModel === model.value}
              onClick={() => onWorkModelChange(
                workModel === model.value ? undefined : model.value
              )}
            >
              {model.label}
            </FilterChip>
          ))}
        </FilterSection>

        <FilterSection label="Remote Work">
          <FilterChip
            active={hasRemote === true}
            onClick={() => onRemoteChange(hasRemote === true ? undefined : true)}
          >
            Remote Available
          </FilterChip>
          <FilterChip
            active={hasRemote === false}
            onClick={() => onRemoteChange(hasRemote === false ? undefined : false)}
          >
            On-site Only
          </FilterChip>
        </FilterSection>

        <FilterSection label="Seniority Level">
          {SENIORITY_LEVELS.map(level => (
            <FilterChip
              key={level.value}
              active={seniority === level.value}
              onClick={() => onSeniorityChange(
                seniority === level.value ? undefined : level.value
              )}
            >
              {level.label}
            </FilterChip>
          ))}
        </FilterSection>

        <FilterSection label="Contract Type">
          {CONTRACT_TYPES.map(type => (
            <FilterChip
              key={type.value}
              active={contractType === type.value}
              onClick={() => onContractTypeChange(
                contractType === type.value ? undefined : type.value
              )}
            >
              {type.label}
            </FilterChip>
          ))}
        </FilterSection>
      </div>
    </div>
  );
}

interface FilterSectionProps {
  label: string;
  children: React.ReactNode;
}

function FilterSection({ label, children }: FilterSectionProps) {
  return (
    <div>
      <label className="text-xs font-medium text-foreground-tertiary block mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {children}
      </div>
    </div>
  );
}

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function FilterChip({ active, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-2.5 py-1 text-xs font-medium rounded-md
        transition-all duration-150 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1
        ${active
          ? 'bg-secondary text-foreground-inverse shadow-sm'
          : 'bg-background-secondary text-foreground-secondary hover:bg-background-tertiary hover:text-foreground'
        }
      `}
    >
      {children}
    </button>
  );
}
