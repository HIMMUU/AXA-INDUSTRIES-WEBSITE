import { create } from 'zustand';
import { EnquiryStatus, EnquirySource } from '@axa/types';

interface EnquiriesState {
  page: number;
  searchQuery: string;
  selectedStatus: EnquiryStatus | '';
  selectedSource: EnquirySource | '';
  selectedInstitutionType: string;
  selectedCity: string;
  fromDate: string;
  toDate: string;
  selectedIds: string[];
  setPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedStatus: (status: EnquiryStatus | '') => void;
  setSelectedSource: (source: EnquirySource | '') => void;
  setSelectedInstitutionType: (institutionType: string) => void;
  setSelectedCity: (city: string) => void;
  setDateRange: (fromDate: string, toDate: string) => void;
  setSelectedIds: (ids: string[]) => void;
  toggleSelect: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  resetFilters: () => void;
}

export const useEnquiriesStore = create<EnquiriesState>((set) => ({
  page: 1,
  searchQuery: '',
  selectedStatus: '',
  selectedSource: '',
  selectedInstitutionType: '',
  selectedCity: '',
  fromDate: '',
  toDate: '',
  selectedIds: [],
  setPage: (page) => set({ page }),
  setSearchQuery: (searchQuery) => set({ searchQuery, page: 1 }),
  setSelectedStatus: (selectedStatus) => set({ selectedStatus, page: 1 }),
  setSelectedSource: (selectedSource) => set({ selectedSource, page: 1 }),
  setSelectedInstitutionType: (selectedInstitutionType) => set({ selectedInstitutionType, page: 1 }),
  setSelectedCity: (selectedCity) => set({ selectedCity, page: 1 }),
  setDateRange: (fromDate, toDate) => set({ fromDate, toDate, page: 1 }),
  setSelectedIds: (selectedIds) => set({ selectedIds }),
  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((item) => item !== id)
        : [...state.selectedIds, id]
    })),
  selectAll: (ids) => set({ selectedIds: ids }),
  clearSelection: () => set({ selectedIds: [] }),
  resetFilters: () =>
    set({
      page: 1,
      searchQuery: '',
      selectedStatus: '',
      selectedSource: '',
      selectedInstitutionType: '',
      selectedCity: '',
      fromDate: '',
      toDate: '',
      selectedIds: []
    })
}));
