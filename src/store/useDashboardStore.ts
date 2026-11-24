import { create } from 'zustand'
import type { ChartType, CoinFilters, Theme } from '../types'

const defaultFilters: CoinFilters = {
  search: '',
  order: 'market_cap_desc',
  limit: 100,
}

type DashboardState = {
  filters: CoinFilters
  theme: Theme
  favorites: string[]
  chartType: ChartType
  setFilters: (filters: Partial<CoinFilters>) => void
  resetFilters: () => void
  toggleTheme: () => void
  toggleFavorite: (id: string) => void
  setChartType: (type: ChartType) => void
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  filters: { ...defaultFilters },
  theme: 'light',
  favorites: [],
  chartType: 'bar',
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
  })),
  resetFilters: () => set({ filters: { ...defaultFilters } }),
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light',
  })),
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id)
      ? state.favorites.filter((favoriteId) => favoriteId !== id)
      : [...state.favorites, id],
  })),
  setChartType: (chartType) => set({ chartType }),
}))
