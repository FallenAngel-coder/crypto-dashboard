import type { Coin, SortDirection, SortField } from '../types'
import Widget from './Widget'

type CoinTableProps = {
  coins: Coin[]
  sortField: SortField
  sortDirection: SortDirection
  onSort: (field: SortField) => void
}

function CoinTable({ coins, sortField, sortDirection, onSort }: CoinTableProps) {
  const directionLabel = sortDirection === 'asc' ? '↑' : '↓'
  const ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending'

  return (
    <div className="coin-table">
      <Widget title="Таблиця монет">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col" aria-sort={sortField === 'name' ? ariaSort : 'none'}>
                  <button type="button" onClick={() => onSort('name')}>
                    Назва монети {sortField === 'name' && directionLabel}
                  </button>
                </th>
                <th scope="col">Символ</th>
                <th scope="col" aria-sort={sortField === 'current_price' ? ariaSort : 'none'}>
                  <button type="button" onClick={() => onSort('current_price')}>
                    Ціна, USD {sortField === 'current_price' && directionLabel}
                  </button>
                </th>
                <th scope="col">Зміна за 24 години, %</th>
                <th scope="col">Капіталізація, USD</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr key={coin.id}>
                  <td>{coin.name}</td>
                  <td>{coin.symbol.toUpperCase()}</td>
                  <td>{coin.current_price === null
                    ? '—'
                    : coin.current_price.toLocaleString('uk-UA', { style: 'currency', currency: 'USD' })}</td>
                  <td>{coin.price_change_percentage_24h === null
                    ? '—'
                    : `${coin.price_change_percentage_24h > 0 ? '+' : coin.price_change_percentage_24h < 0 ? '−' : ''}${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%`}</td>
                  <td>{coin.market_cap === null
                    ? '—'
                    : coin.market_cap.toLocaleString('uk-UA', { style: 'currency', currency: 'USD' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Widget>
    </div>
  )
}

export default CoinTable
