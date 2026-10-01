import Widget from './Widget'

type KpiCardProps = {
  title: string
  value: string
  change: number | null
}

function KpiCard({ title, value, change }: KpiCardProps) {
  return (
    <Widget title={title}>
      <p className="kpi-value">{value}</p>
      <p>
        За 24 години: <span className={change === null || change === 0
          ? 'change-neutral'
          : change > 0 ? 'change-positive' : 'change-negative'}>
          {change === null
            ? '—'
            : `${change > 0 ? '+' : change < 0 ? '−' : ''}${Math.abs(change).toFixed(2)}%`}
        </span>
      </p>
    </Widget>
  )
}

export default KpiCard
