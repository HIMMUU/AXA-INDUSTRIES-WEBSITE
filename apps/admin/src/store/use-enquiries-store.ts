import { create } from 'zustand';
import { EnquiryStatus, EnquirySource } from '@axa/types';

interface EnquiriesState {
  page: number;
  searchQuery: string;
  selectedStatus: EnquiryStatus | '';
  selectedSource: EnquirySource | '';
  selectedIds: string[];
  setPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedStatus: (status: EnquiryStatus | '') => void;
  setSelectedSource: (source: EnquirySource | '') => void;
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
  selectedIds: [],
  setPage: (page) => set({ page }),
  setSearchQuery: (searchQuery) => set({ searchQuery, page: 1 }),
  setSelectedStatus: (selectedStatus) => set({ selectedStatus, page: 1 }),
  setSelectedSource: (selectedSource) => set({ selectedSource, page: 1 }),
  setSelectedIds: (selectedIds) => set({ selectedIds }),
  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((item) => item !== id)
        : [...state.selectedIds, id]
    })),
  selectAll: (ids) => set({ selectedIds: ids }),
  clearSelection: () => set({ selectedIds: [] }),
  resetFilters: () => set({ page: 1, searchQuery: '', selectedStatus: '', selectedSource: '', selectedIds: [] })
}));
