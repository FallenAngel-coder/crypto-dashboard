import { useDashboardStore } from '../store/useDashboardStore'
import type { CoinFilters } from '../types'
import Widget from './Widget'

function FilterPanel() {
  const filters = useDashboardStore((state) => state.filters)
  const setFilters = useDashboardStore((state) => state.setFilters)
  const resetFilters = useDashboardStore((state) => state.resetFilters)

  return (
    <div className="filter-panel">
      <Widget title="Фільтри вибірки">
        <form className="filters-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Повна назва монети
            <input
              type="text"
              value={filters.search}
              onChange={(event) => setFilters({ search: event.target.value })}
              placeholder="Bitcoin"
              aria-describedby="search-help"
            />
            <small id="search-help">Пошук лише за повною назвою монети.</small>
          </label>

          <label>
            Порядок вибірки
            <select
              value={filters.order}
              onChange={(event) => setFilters({ order: event.target.value as CoinFilters['order'] })}
            >
              <option value="market_cap_desc">За капіталізацією</option>
              <option value="volume_desc">За обсягом торгів</option>
            </select>
          </label>

          <label>
            Кількість монет
            <select
              value={filters.limit}
              onChange={(event) => setFilters({ limit: Number(event.target.value) as CoinFilters['limit'] })}
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>

          <button type="button" onClick={resetFilters}>Скинути фільтри</button>
        </form>
      </Widget>
    </div>
  )
}

export default FilterPanel
