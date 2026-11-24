import type { ChartType } from '../types'

type ChartTypeSwitchProps = {
  type: ChartType
  onChange: (type: ChartType) => void
}

function ChartTypeSwitch({ type, onChange }: ChartTypeSwitchProps) {
  return (
    <div className="button-group" role="group" aria-label="Тип графіка">
      <button type="button" aria-pressed={type === 'bar'} onClick={() => onChange('bar')}>
        Стовпчиковий
      </button>
      <button type="button" aria-pressed={type === 'line'} onClick={() => onChange('line')}>
        Лінійний
      </button>
    </div>
  )
}

export default ChartTypeSwitch
