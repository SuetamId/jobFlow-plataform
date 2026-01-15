'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card } from '@/presentation/components/ui';
import { CreateJobDTO, UpdateJobDTO } from '@/core/recruiter/application/dtos';
import { SeniorityLevel } from '@/core/job/domain/value-objects/Seniority';
import { ContractTypeValue } from '@/core/job/domain/value-objects/ContractType';
import { WorkModelType } from '@/core/job/domain/value-objects/WorkModel';

interface JobFormProps {
  companyId: string;
  initialData?: Partial<CreateJobDTO> & { id?: string };
  onSubmit: (data: CreateJobDTO | UpdateJobDTO) => Promise<void>;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

const SENIORITY_OPTIONS: { value: SeniorityLevel; label: string }[] = [
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid-Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'executive', label: 'Executive' },
];

const CONTRACT_TYPE_OPTIONS: { value: ContractTypeValue; label: string }[] = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'internship', label: 'Internship' },
  { value: 'temporary', label: 'Temporary' },
];

const WORK_MODEL_OPTIONS: { value: WorkModelType; label: string }[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
];

const CURRENCY_OPTIONS = ['USD', 'EUR', 'GBP', 'BRL', 'CAD'] as const;

export function JobForm({ companyId, initialData, onSubmit, isLoading, mode }: JobFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    city: initialData?.city ?? '',
    state: initialData?.state ?? '',
    country: initialData?.country ?? '',
    isRemote: initialData?.isRemote ?? false,
    workModel: initialData?.workModel ?? 'remote' as WorkModelType,
    contractTypes: initialData?.contractTypes ?? ['full-time'] as ContractTypeValue[],
    seniority: initialData?.seniority ?? null as SeniorityLevel | null,
    salaryMin: initialData?.salaryMin ?? null as number | null,
    salaryMax: initialData?.salaryMax ?? null as number | null,
    salaryCurrency: initialData?.salaryCurrency ?? 'USD' as 'USD' | 'EUR' | 'GBP' | 'BRL' | 'CAD',
    applicationUrl: initialData?.applicationUrl ?? '',
    expiresAt: initialData?.expiresAt ?? '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError('Job title is required');
      return;
    }

    if (!formData.description.trim()) {
      setError('Job description is required');
      return;
    }

    if (!formData.applicationUrl.trim()) {
      setError('Application URL is required');
      return;
    }

    try {
      const data: CreateJobDTO = {
        companyId,
        title: formData.title.trim(),
        description: formData.description.trim(),
        city: formData.city.trim() || null,
        state: formData.state.trim() || null,
        country: formData.country.trim() || null,
        isRemote: formData.isRemote,
        workModel: formData.workModel,
        contractTypes: formData.contractTypes,
        seniority: formData.seniority,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
        salaryCurrency: formData.salaryCurrency,
        applicationUrl: formData.applicationUrl.trim(),
        expiresAt: formData.expiresAt || null,
      };

      if (mode === 'edit' && initialData?.id) {
        await onSubmit({ ...data, id: initialData.id } as UpdateJobDTO);
      } else {
        await onSubmit(data);
      }

      router.push('/recruiter/jobs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save job');
    }
  };

  const handleContractTypeToggle = (type: ContractTypeValue) => {
    setFormData(prev => {
      const types = prev.contractTypes.includes(type)
        ? prev.contractTypes.filter(t => t !== type)
        : [...prev.contractTypes, type];
      return { ...prev, contractTypes: types.length > 0 ? types : [type] };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="e.g. Senior React Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={6}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
                placeholder="Describe the role, responsibilities, and requirements..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Application URL *
              </label>
              <input
                type="url"
                value={formData.applicationUrl}
                onChange={e => setFormData(prev => ({ ...prev, applicationUrl: e.target.value }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="https://company.com/apply"
              />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-4">Location</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isRemote"
                checked={formData.isRemote}
                onChange={e => setFormData(prev => ({ ...prev, isRemote: e.target.checked }))}
                className="w-4 h-4 text-secondary border-border rounded focus:ring-secondary"
              />
              <label htmlFor="isRemote" className="text-sm text-foreground">
                Remote position available
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Work Model
              </label>
              <div className="flex flex-wrap gap-2">
                {WORK_MODEL_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, workModel: option.value }))}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      formData.workModel === option.value
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-background border-border text-foreground hover:border-secondary'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="San Francisco"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={e => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="United States"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-4">Job Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Contract Type
              </label>
              <div className="flex flex-wrap gap-2">
                {CONTRACT_TYPE_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleContractTypeToggle(option.value)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      formData.contractTypes.includes(option.value)
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-background border-border text-foreground hover:border-secondary'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Seniority Level
              </label>
              <div className="flex flex-wrap gap-2">
                {SENIORITY_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      seniority: prev.seniority === option.value ? null : option.value 
                    }))}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      formData.seniority === option.value
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-background border-border text-foreground hover:border-secondary'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-4">Compensation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Minimum Salary
              </label>
              <input
                type="number"
                value={formData.salaryMin ?? ''}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  salaryMin: e.target.value ? Number(e.target.value) : null 
                }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Maximum Salary
              </label>
              <input
                type="number"
                value={formData.salaryMax ?? ''}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  salaryMax: e.target.value ? Number(e.target.value) : null 
                }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="80000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Currency
              </label>
              <select
                value={formData.salaryCurrency}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  salaryCurrency: e.target.value as typeof formData.salaryCurrency 
                }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              >
                {CURRENCY_OPTIONS.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-4">Expiration</h2>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Expires At (optional)
            </label>
            <input
              type="date"
              value={formData.expiresAt ? formData.expiresAt.split('T')[0] : ''}
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                expiresAt: e.target.value ? `${e.target.value}T23:59:59Z` : '' 
              }))}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
        </Card>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Saving...
              </div>
            ) : (
              mode === 'create' ? 'Post Job' : 'Update Job'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
