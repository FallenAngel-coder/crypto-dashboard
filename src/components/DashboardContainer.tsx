import { useState } from 'react'
import { useDashboardStore } from '../store/useDashboardStore'
import KpiCard from './KpiCard'
import CoinTable from './CoinTable'
import Counter from './Counter'
import FilteredList from './FilteredList'
import FilterPanel from './FilterPanel'
import ChartWidget from './ChartWidget'
import { useDebounce } from '../hooks/useDebounce'
import { useCoins } from '../hooks/useCoins'
import type { SortDirection, SortField } from '../types'

function DashboardContainer() {
  const filters = useDashboardStore((state) => state.filters)
  const debouncedParameters = useDebounce(filters, 400)
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
      <FilterPanel />

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
      </div>

      <div hidden={!hasData}>
        <FilteredList title="Список монет" items={coins.slice(0, 6)} />
      </div>

      {hasData && <ChartWidget coins={coins} />}

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
