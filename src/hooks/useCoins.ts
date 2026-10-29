import { useEffect, useState } from 'react'
import type { Coin, CoinFilters } from '../types'

export function useCoins({ search, order, limit }: CoinFilters) {
  const [data, setData] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const name = search.trim()

  useEffect(() => {
    const controller = new AbortController()

    async function loadCoins() {
      setLoading(true)
      setError(null)

      try {
        const apiKey = import.meta.env.VITE_COINGECKO_API_KEY?.trim()

        if (!apiKey) {
          if (!controller.signal.aborted) {
            setError('Не вказано Demo-ключ CoinGecko у VITE_COINGECKO_API_KEY у файлі .env.local.')
          }
          return
        }

        const parameters = new URLSearchParams({
          vs_currency: 'usd',
          order,
          per_page: String(limit),
          page: '1',
          sparkline: 'false',
        })

        if (name) {
          parameters.set('names', name)
        }

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?${parameters}`,
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

        const coins: Coin[] = await response.json()

        if (!Array.isArray(coins)) {
          if (!controller.signal.aborted) {
            setError('CoinGecko повернув некоректний формат списку монет.')
          }
          return
        }

        if (!controller.signal.aborted) {
          setData(coins)
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
  }, [name, order, limit])

  return { data, loading, error }
}
