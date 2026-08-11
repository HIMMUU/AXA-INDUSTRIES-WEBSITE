import { create } from 'zustand';
import { OrderStatus } from '@axa/types';

interface OrdersState {
  page: number;
  limit: number;
  searchQuery: string;
  statusFilter: OrderStatus | 'ALL';
  selectedIds: string[];
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: OrderStatus | 'ALL') => void;
  setSelectedIds: (ids: string[]) => void;
  toggleSelectId: (id: string) => void;
  selectAllOnPage: (pageIds: string[]) => void;
  clearSelection: () => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  page: 1,
  limit: 10,
  searchQuery: '',
  statusFilter: 'ALL',
  selectedIds: [],
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
  setSearchQuery: (searchQuery) => set({ searchQuery, page: 1 }),
  setStatusFilter: (statusFilter) => set({ statusFilter, page: 1 }),
  setSelectedIds: (selectedIds) => set({ selectedIds }),
  toggleSelectId: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((item) => item !== id)
        : [...state.selectedIds, id]
    })),
  selectAllOnPage: (pageIds) =>
    set((state) => {
      const allSelected = pageIds.every((id) => state.selectedIds.includes(id));
      if (allSelected) {
        return { selectedIds: state.selectedIds.filter((id) => !pageIds.includes(id)) };
      } else {
        return { selectedIds: Array.from(new Set([...state.selectedIds, ...pageIds])) };
      }
    }),
  clearSelection: () => set({ selectedIds: [] })
}));
