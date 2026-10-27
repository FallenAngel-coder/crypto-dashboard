import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import type { CoinFilters } from '../types'
import Widget from './Widget'

type FilterPanelProps = {
  control: Control<CoinFilters>
  onReset: () => void
}

function FilterPanel({ control, onReset }: FilterPanelProps) {
  return (
    <div className="filter-panel">
      <Widget title="Фільтри вибірки">
        <form className="filters-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Повна назва монети
            <Controller
              name="search"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Bitcoin"
                  aria-describedby="search-help"
                />
              )}
            />
            <small id="search-help">Пошук лише за повною назвою монети.</small>
          </label>

          <label>
            Порядок вибірки
            <Controller
              name="order"
              control={control}
              render={({ field }) => (
                <select {...field} value={field.value} onChange={field.onChange}>
                  <option value="market_cap_desc">За капіталізацією</option>
                  <option value="volume_desc">За обсягом торгів</option>
                </select>
              )}
            />
          </label>

          <label>
            Кількість монет
            <Controller
              name="limit"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  value={field.value}
                  onChange={(event) => field.onChange(Number(event.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              )}
            />
          </label>

          <button type="button" onClick={onReset}>Скинути фільтри</button>
        </form>
      </Widget>
    </div>
  )
}

export default FilterPanel
