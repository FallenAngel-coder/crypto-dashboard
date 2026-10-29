import { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import KpiCard from './KpiCard'
import CoinTable from './CoinTable'
import Counter from './Counter'
import Toggle from './Toggle'
import FilteredList from './FilteredList'
import FilterPanel from './FilterPanel'
import { useDebounce } from '../hooks/useDebounce'
import { useCoins } from '../hooks/useCoins'
import type { CoinFilters, SortDirection, SortField } from '../types'

const defaultFilters: CoinFilters = {
  search: '',
  order: 'market_cap_desc',
  limit: 100,
}

function DashboardContainer() {
  const { control, reset } = useForm<CoinFilters>({ defaultValues: defaultFilters })
  const [search, order, limit] = useWatch({ control, name: ['search', 'order', 'limit'] })
  const parameters = useMemo(() => ({ search, order, limit }), [search, order, limit])
  const debouncedParameters = useDebounce(parameters, 400)
  const { data: coins, loading, error } = useCoins(debouncedParameters)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const hasData = !loading && error === null && coins.length > 0

  const sortedCoins = [...coins].sort((first, second) => {
    const direction = sortDirection === 'asc' ? 1 : -1

    if (sortField === 'name') {
      return first.name.localeCompare(second.name) * direction
    }

    if (first.current_price === null && second.current_price === null) {
      return 0
    }

    if (first.current_price === null) {
      return 1
    }

    if (second.current_price === null) {
      return -1
    }

    return (first.current_price - second.current_price) * direction
  })

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDirection((direction) => direction === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  return (
    <>
      <FilterPanel control={control} onReset={() => reset(defaultFilters)} />

      {loading ? <p role="status">Завантаження даних…</p>
        : error ? <p className="error" role="alert">{error}</p>
          : coins.length === 0 ? <p>Даних немає</p>
            : (
              <div className="kpi-grid">
                {coins.slice(0, 3).map((coin) => (
                  <KpiCard
                    key={coin.id}
                    title={coin.name}
                    value={coin.current_price === null
                      ? '—'
                      : coin.current_price.toLocaleString('uk-UA', { style: 'currency', currency: 'USD' })}
                    change={coin.price_change_percentage_24h}
                  />
                ))}
              </div>
            )}

      <div className="widget-grid">
        <Counter title="Лічильник" initialValue={0} step={1} min={0} max={10} />
        <Toggle title="Оформлення секції" />
      </div>

      <div hidden={!hasData}>
        <FilteredList title="Список монет" items={coins.slice(0, 6)} />
      </div>

      {hasData && (
        <CoinTable
          coins={sortedCoins}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      )}
    </>
  )
}

export default DashboardContainer
