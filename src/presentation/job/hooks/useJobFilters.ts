'use client';

import { useState, useCallback } from 'react';
import { JobFiltersDTO } from '@/core/job/application/dtos';
import { SeniorityLevel } from '@/core/job/domain/value-objects/Seniority';
import { ContractTypeValue } from '@/core/job/domain/value-objects/ContractType';
import { WorkModelType } from '@/core/job/domain/value-objects/WorkModel';

interface UseJobFiltersResult {
  filters: JobFiltersDTO;
  setSearch: (search: string) => void;
  setLocation: (location: string) => void;
  setHasRemote: (hasRemote: boolean | undefined) => void;
  setSeniority: (level: SeniorityLevel | undefined) => void;
  setContractType: (type: ContractTypeValue | undefined) => void;
  setWorkModel: (model: WorkModelType | undefined) => void;
  setPage: (page: number) => void;
  setSortBy: (field: 'publishedAt' | 'salary' | 'title' | undefined) => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: JobFiltersDTO = {
  search: '',
  location: '',
  hasRemote: undefined,
  seniority: undefined,
  contractType: undefined,
  workModel: undefined,
  page: 1,
  perPage: 10,
  sortBy: 'publishedAt',
  sortDirection: 'desc',
};

export function useJobFilters(initialFilters?: Partial<JobFiltersDTO>): UseJobFiltersResult {
  const [filters, setFilters] = useState<JobFiltersDTO>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const setSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search, page: 1 }));
  }, []);

  const setLocation = useCallback((location: string) => {
    setFilters(prev => ({ ...prev, location, page: 1 }));
  }, []);

  const setHasRemote = useCallback((hasRemote: boolean | undefined) => {
    setFilters(prev => ({ ...prev, hasRemote, page: 1 }));
  }, []);

  const setSeniority = useCallback((seniority: SeniorityLevel | undefined) => {
    setFilters(prev => ({ ...prev, seniority, page: 1 }));
  }, []);

  const setContractType = useCallback((contractType: ContractTypeValue | undefined) => {
    setFilters(prev => ({ ...prev, contractType, page: 1 }));
  }, []);

  const setWorkModel = useCallback((workModel: WorkModelType | undefined) => {
    setFilters(prev => ({ ...prev, workModel, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const setSortBy = useCallback((sortBy: 'publishedAt' | 'salary' | 'title' | undefined) => {
    setFilters(prev => ({ ...prev, sortBy }));
  }, []);

  const setSortDirection = useCallback((sortDirection: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, sortDirection }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return {
    filters,
    setSearch,
    setLocation,
    setHasRemote,
    setSeniority,
    setContractType,
    setWorkModel,
    setPage,
    setSortBy,
    setSortDirection,
    resetFilters,
  };
}
