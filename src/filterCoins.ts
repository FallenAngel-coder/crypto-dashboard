import type { Coin } from './types'

export function filterCoins(items: Coin[], category: string): Coin[] {
  return items.filter((coin) => {
    const change = coin.price_change_percentage_24h

    if (category === 'rising') {
      return change !== null && change > 0
    }

    if (category === 'falling') {
      return change !== null && change < 0
    }

    return true
  })
}
