export type Coin = {
  id: string
  name: string
  symbol: string
  current_price: number | null
  price_change_percentage_24h: number | null
  market_cap: number | null
}

export type SortField = 'name' | 'current_price'
export type SortDirection = 'asc' | 'desc'

export type CoinFilters = {
  search: string
  order: 'market_cap_desc' | 'volume_desc'
  limit: 10 | 50 | 100
}

export type CoinDetails = {
  id: string
  name?: string | null
  symbol?: string | null
  market_data?: {
    current_price?: { usd?: number | null } | null
    price_change_percentage_24h?: number | null
    total_volume?: { usd?: number | null } | null
    high_24h?: { usd?: number | null } | null
    low_24h?: { usd?: number | null } | null
    circulating_supply?: number | null
  } | null
}

