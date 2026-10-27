import { useEffect, useState } from 'react'
import KpiCard from './KpiCard'
import CoinTable from './CoinTable'
import Counter from './Counter'
import Toggle from './Toggle'
import FilteredList from './FilteredList'
import type { Coin, SortDirection, SortField } from '../types'

function DashboardContainer() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const hasData = !loading && error === null && coins.length > 0

  useEffect(() => {
    const controller = new AbortController()

    async function loadCoins() {
      try {
        const apiKey = import.meta.env.VITE_COINGECKO_API_KEY?.trim()

        if (!apiKey) {
          if (!controller.signal.aborted) {
            setError('Не вказано Demo-ключ CoinGecko у VITE_COINGECKO_API_KEY у файлі .env.local.')
          }
          return
        }

        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
          {
            headers: { 'x-cg-demo-api-key': apiKey },
            signal: controller.signal,
          },
        )

        if (!response.ok) {
          const errorData: { error?: string; status?: { error_message?: string } } | null =
            await response.json().catch(() => null)
          const apiMessage = errorData?.status?.error_message ?? errorData?.error
          const details = typeof apiMessage === 'string' ? apiMessage : response.statusText
          const message = response.status === 401 || response.status === 403
            ? 'CoinGecko відхилив доступ. Перевірте Demo-ключ у .env.local.'
            : response.status === 429
              ? 'Перевищено ліміт запитів CoinGecko. Спробуйте пізніше.'
              : 'Не вдалося отримати дані CoinGecko.'

          if (!controller.signal.aborted) {
            setError(`${message} HTTP ${response.status}${details ? `: ${details}` : ''}`)
          }
          return
        }

        const data: Coin[] = await response.json()

        if (!Array.isArray(data)) {
          if (!controller.signal.aborted) {
            setError('CoinGecko повернув некоректний формат списку монет.')
          }
          return
        }

        if (!controller.signal.aborted) {
          setCoins(data)
        }
      } catch (requestError: unknown) {
        if (!controller.signal.aborted) {
          setError(
            requestError instanceof Error
              ? `Не вдалося отримати дані CoinGecko: ${requestError.message}`
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
