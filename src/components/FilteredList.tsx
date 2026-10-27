import { useState } from 'react'
import type { Coin } from '../types'
import { filterCoins } from '../filterCoins'
import Widget from './Widget'

type FilteredListProps = {
  title: string
  items: Coin[]
}

function FilteredList({ title, items }: FilteredListProps) {
  const [category, setCategory] = useState('all')
  const filteredItems = filterCoins(items, category)

  return (
    <Widget title={title}>
      <label className="filter">
        Напрямок зміни ціни
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">Усі</option>
          <option value="rising">Зростають</option>
          <option value="falling">Падають</option>
        </select>
      </label>
      {filteredItems.length === 0 ? <p>Монет для цієї категорії немає.</p> : (
        <ul className="coin-list">
          {filteredItems.map((coin) => (
            <li key={coin.id}>
              <div><strong>{coin.name}</strong> <span className="symbol">{coin.symbol.toUpperCase()}</span></div>
              <div className="coin-values">
                <span>{coin.current_price === null
                  ? '—'
                  : coin.current_price.toLocaleString('uk-UA', { style: 'currency', currency: 'USD' })}</span>
                <span>За 24 години: {coin.price_change_percentage_24h === null
                  ? '—'
                  : `${coin.price_change_percentage_24h > 0 ? '+' : coin.price_change_percentage_24h < 0 ? '−' : ''}${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%`}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Widget>
  )
}

export default FilteredList
