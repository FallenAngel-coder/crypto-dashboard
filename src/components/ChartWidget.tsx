import { useDashboardStore } from '../store/useDashboardStore'
import type { Coin } from '../types'
import ChartTypeSwitch from './ChartTypeSwitch'
import PriceChart from './PriceChart'
import Widget from './Widget'

function ChartWidget({ coins }: { coins: Coin[] }) {
  const chartType = useDashboardStore((state) => state.chartType)
  const setChartType = useDashboardStore((state) => state.setChartType)
  const data = coins.slice(0, 10).map((coin) => ({
    name: coin.name,
    price: coin.current_price,
  }))

  return (
    <div className="chart-widget">
      <Widget title="Порівняння цін монет">
        <p>До 10 монет поточної вибірки. Ціни в USD. Відсутні ціни не відображаються.</p>
        <ChartTypeSwitch type={chartType} onChange={setChartType} />
        {data.some((coin) => coin.price != null)
          ? <PriceChart data={data} type={chartType} />
          : <p role="status">Немає цін для побудови графіка.</p>}
      </Widget>
    </div>
  )
}

export default ChartWidget
