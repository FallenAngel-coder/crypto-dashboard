import { useEffect, useState } from 'react'
import type { CoinDetails } from '../types'

type CoinDetailsState = {
  id: string | undefined
  data: CoinDetails | null
  loading: boolean
  error: string | null
  notFound: boolean
}

export function useCoinDetails(id: string | undefined) {
  const [state, setState] = useState<CoinDetailsState>({
    id,
    data: null,
    loading: Boolean(id),
    error: null,
    notFound: !id,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadCoinDetails() {
      const nextState: CoinDetailsState = {
        id,
        data: null,
        loading: Boolean(id),
        error: null,
        notFound: !id,
      }
      setState({ ...nextState })

      if (!id) {
        return
      }

      try {
        const apiKey = import.meta.env.VITE_COINGECKO_API_KEY?.trim()

        if (!apiKey) {
          throw new Error('Не вказано Demo-ключ CoinGecko у VITE_COINGECKO_API_KEY у файлі .env.local.')
        }

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(id)}`,
          {
            headers: { 'x-cg-demo-api-key': apiKey },
            signal: controller.signal,
          },
        )

        if (response.status === 404) {
          nextState.notFound = true
        } else if (!response.ok) {
          const message = response.status === 429
            ? 'Перевищено ліміт запитів CoinGecko. Спробуйте пізніше.'
            : response.status === 401 || response.status === 403
              ? 'CoinGecko відхилив доступ. Перевірте Demo-ключ у .env.local.'
              : 'Не вдалося отримати деталі монети.'
          throw new Error(`${message} HTTP ${response.status}`)
        } else {
          const coin: CoinDetails = await response.json()

          if (!coin || typeof coin.id !== 'string') {
            throw new Error('CoinGecko повернув некоректний формат деталей монети.')
          }

          nextState.data = coin
        }
      } catch (requestError: unknown) {
        if (requestError instanceof Error && requestError.name === 'AbortError') {
          return
        }

        nextState.error = requestError instanceof Error
          ? requestError.message
          : 'Не вдалося отримати деталі монети.'
      } finally {
        if (!controller.signal.aborted) {
          setState({ ...nextState, loading: false })
        }
      }
    }

    void loadCoinDetails()

    return () => controller.abort()
  }, [id])

  return state.id === id
    ? state
    : { data: null, loading: Boolean(id), error: null, notFound: !id }
}
