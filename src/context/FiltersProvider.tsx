import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import type { CoinFilters } from '../types'
import { FiltersContext } from './FiltersContext'

function FiltersProvider({ children }: { children: ReactNode }) {
  const { control, reset } = useForm<CoinFilters>({
    defaultValues: {
      search: '',
      order: 'market_cap_desc',
      limit: 100,
    },
    shouldUnregister: false,
  })

  return (
    <FiltersContext.Provider value={{ control, reset }}>
      {children}
    </FiltersContext.Provider>
  )
}

export default FiltersProvider
