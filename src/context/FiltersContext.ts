import { createContext } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { CoinFilters } from '../types'

type FiltersContextValue = Pick<UseFormReturn<CoinFilters>, 'control' | 'reset'>

export const FiltersContext = createContext<FiltersContextValue | null>(null)
