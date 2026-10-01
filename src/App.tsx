import { useEffect, useState } from 'react'
import KpiCard from './components/KpiCard'
import Counter from './components/Counter'
import Toggle from './components/Toggle'
import FilteredList from './components/FilteredList'
import type { Coin } from './types'
import './App.css'

function App() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCoins() {
      try {
        const apiKey = import.meta.env.VITE_COINGECKO_API_KEY?.trim()

        if (!apiKey) {
          throw new Error('API ключ не працює')
        }

        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false',
          {
            headers: { 'x-cg-demo-api-key': apiKey },
            signal: controller.signal,
          },
        )

        if (!response.ok) {
          throw new Error(`Не вдалося отримати дані CoinGecko (HTTP ${response.status}).`)
        }

        const data: Coin[] = await response.json()

        if (!controller.signal.aborted) {
          setCoins(data)
        }
      } catch (requestError: unknown) {
        if (!controller.signal.aborted) {
          setError(
            requestError instanceof Error && !(requestError instanceof TypeError)
              ? requestError.message
              : 'Не вдалося отримати дані CoinGecko.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void loadCoins()

    return () => controller.abort()
  }, [])

  return (
    <main className="dashboard">
      <h1>Крипторинок</h1>
      <p className="intro">Ціни монет у USD та зміна за 24 години.</p>

      {loading && <p role="status">Завантаження даних…</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {!loading && !error && coins.length === 0 && <p>Даних про монети немає.</p>}

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

      <div className="widget-grid">
        <Counter title="Лічильник" initialValue={0} />
        <Toggle title="Оформлення секції" />
      </div>

      <FilteredList title="Список монет" items={coins} />
    </main>
  )
}

export default App
