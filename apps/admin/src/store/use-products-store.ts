import { create } from 'zustand';

interface ProductsState {
  selectedProductIds: string[];
  searchQuery: string;
  selectedStatus: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;

  setSelectedProductIds: (ids: string[]) => void;
  toggleSelectProduct: (id: string) => void;
  toggleSelectAll: (allIds: string[]) => void;
  clearSelection: () => void;

  setSearchQuery: (query: string) => void;
  setSelectedStatus: (status: string) => void;
  setPriceRange: (min?: number, max?: number) => void;
  setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  selectedProductIds: [],
  searchQuery: '',
  selectedStatus: '',
  minPrice: undefined,
  maxPrice: undefined,
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,

  setSelectedProductIds: (ids) => set({ selectedProductIds: ids }),
  toggleSelectProduct: (id) =>
    set((state) => ({
      selectedProductIds: state.selectedProductIds.includes(id)
        ? state.selectedProductIds.filter((item) => item !== id)
        : [...state.selectedProductIds, id]
    })),
  toggleSelectAll: (allIds) =>
    set((state) => ({
      selectedProductIds:
        state.selectedProductIds.length === allIds.length ? [] : allIds
    })),
  clearSelection: () => set({ selectedProductIds: [] }),

  setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),
  setSelectedStatus: (status) => set({ selectedStatus: status, page: 1 }),
  setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max, page: 1 }),
  setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
  setPage: (page) => set({ page }),
  resetFilters: () =>
    set({
      searchQuery: '',
      selectedStatus: '',
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      page: 1,
      selectedProductIds: []
    })
}));
