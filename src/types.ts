export type Coin = {
  id: string
  name: string
  symbol: string
  current_price: number | null
  price_change_percentage_24h: number | null
}
<<<<<<< Updated upstream
=======

export type SortField = 'name' | 'current_price'
export type SortDirection = 'asc' | 'desc'

export type CoinFilters = {
  search: string
  order: 'market_cap_desc' | 'volume_desc'
  limit: 10 | 50 | 100
}
>>>>>>> Stashed changes
