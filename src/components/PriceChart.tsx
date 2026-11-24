import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartType } from '../types'

type PriceChartProps = {
  data: { name: string; price: number | null }[]
  type: ChartType
}

function PriceChart({ data, type }: PriceChartProps) {
  const axes = (
    <>
      <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="var(--muted)" tick={{ fontSize: 12 }} height={60} />
      <YAxis
        stroke="var(--muted)"
        width={80}
        tickFormatter={(value: number) => value.toLocaleString('uk-UA', { notation: 'compact' })}
      />
      <Tooltip
        cursor={{ fill: 'var(--hover-background)', stroke: 'var(--border)' }}
        formatter={(value) => typeof value === 'number'
          ? value.toLocaleString('uk-UA', { style: 'currency', currency: 'USD' })
          : '—'}
        contentStyle={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
        itemStyle={{ color: 'var(--text)' }}
        labelStyle={{ color: 'var(--text)' }}
      />
    </>
  )

  return (
    <div className="price-chart" role="group" aria-label={`${type === 'bar' ? 'Стовпчиковий' : 'Лінійний'} графік цін у USD`}>
      <ResponsiveContainer width="100%" height={320} minWidth={0}>
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 16, right: 16, bottom: 8, left: 0 }}>
            {axes}
            <Bar dataKey="price" name="Ціна, USD" fill="var(--focus)" isAnimationActive={false} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 16, right: 16, bottom: 8, left: 0 }}>
            {axes}
            <Line dataKey="price" name="Ціна, USD" stroke="var(--focus)" strokeWidth={2} isAnimationActive={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export default PriceChart
