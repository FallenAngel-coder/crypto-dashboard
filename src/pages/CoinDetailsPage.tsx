import { Link, useParams } from 'react-router'
import Widget from '../components/Widget'
import { useCoinDetails } from '../hooks/useCoinDetails'

function formatUsd(value: number | null | undefined) {
  return value == null
    ? '—'
    : value.toLocaleString('uk-UA', { style: 'currency', currency: 'USD' })
}

function CoinDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error, notFound } = useCoinDetails(id)
  const market = data?.market_data
  const change = market?.price_change_percentage_24h

  return (
    <>
      <Link className="back-link" to="/">Назад</Link>
      {loading ? <p role="status">Завантаження деталей монети…</p>
        : notFound ? <p role="status">Монету не знайдено</p>
          : error ? <p className="error" role="alert">{error}</p>
            : data && (
              <Widget title={data.name ?? '—'}>
                <dl className="coin-details">
                  <div><dt>Символ</dt><dd>{data.symbol?.toUpperCase() ?? '—'}</dd></div>
                  <div><dt>Поточна ціна, USD</dt><dd>{formatUsd(market?.current_price?.usd)}</dd></div>
                  <div>
                    <dt>Зміна за 24 години, %</dt>
                    <dd>{change == null
                      ? '—'
                      : `${change > 0 ? '+' : change < 0 ? '−' : ''}${Math.abs(change).toFixed(2)}%`}</dd>
                  </div>
                  <div><dt>Обсяг торгів за 24 години, USD</dt><dd>{formatUsd(market?.total_volume?.usd)}</dd></div>
                  <div><dt>Максимальна ціна за 24 години, USD</dt><dd>{formatUsd(market?.high_24h?.usd)}</dd></div>
                  <div><dt>Мінімальна ціна за 24 години, USD</dt><dd>{formatUsd(market?.low_24h?.usd)}</dd></div>
                  <div><dt>Монети в обігу</dt><dd>{market?.circulating_supply?.toLocaleString('uk-UA') ?? '—'}</dd></div>
                </dl>
              </Widget>
            )}
    </>
  )
}

export default CoinDetailsPage
