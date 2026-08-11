import { create } from 'zustand';

interface CustomersState {
  selectedCustomerIds: string[];
  searchQuery: string;
  selectedStatus: string;
  cityFilter: string;
  stateFilter: string;
  sortBy: 'newest' | 'oldest' | 'mostOrders' | 'highestSpending';
  page: number;

  setSelectedCustomerIds: (ids: string[]) => void;
  toggleSelectCustomer: (id: string) => void;
  toggleSelectAll: (allIds: string[]) => void;
  clearSelection: () => void;

  setSearchQuery: (query: string) => void;
  setSelectedStatus: (status: string) => void;
  setLocationFilter: (city: string, state: string) => void;
  setSorting: (sortBy: 'newest' | 'oldest' | 'mostOrders' | 'highestSpending') => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useCustomersStore = create<CustomersState>((set) => ({
  selectedCustomerIds: [],
  searchQuery: '',
  selectedStatus: '',
  cityFilter: '',
  stateFilter: '',
  sortBy: 'newest',
  page: 1,

  setSelectedCustomerIds: (ids) => set({ selectedCustomerIds: ids }),
  toggleSelectCustomer: (id) =>
    set((state) => ({
      selectedCustomerIds: state.selectedCustomerIds.includes(id)
        ? state.selectedCustomerIds.filter((item) => item !== id)
        : [...state.selectedCustomerIds, id]
    })),
  toggleSelectAll: (allIds) =>
    set((state) => ({
      selectedCustomerIds:
        state.selectedCustomerIds.length === allIds.length ? [] : allIds
    })),
  clearSelection: () => set({ selectedCustomerIds: [] }),

  setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),
  setSelectedStatus: (status) => set({ selectedStatus: status, page: 1 }),
  setLocationFilter: (city, state) => set({ cityFilter: city, stateFilter: state, page: 1 }),
  setSorting: (sortBy) => set({ sortBy }),
  setPage: (page) => set({ page }),
  resetFilters: () =>
    set({
      searchQuery: '',
      selectedStatus: '',
      cityFilter: '',
      stateFilter: '',
      sortBy: 'newest',
      page: 1,
      selectedCustomerIds: []
    })
}));
