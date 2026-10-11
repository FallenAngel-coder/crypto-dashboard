import { useState } from 'react'
import Widget from './Widget'

type CounterProps = {
  title: string
  initialValue: number
  step: number
  min: number
  max: number
}

function Counter({ title, initialValue, step, min, max }: CounterProps) {
  const startingValue = Math.min(max, Math.max(min, initialValue))
  const [count, setCount] = useState(startingValue)

  return (
    <Widget title={title}>
      <p className="counter-value" aria-live="polite">{count}</p>
      <div className="button-group">
        <button
          type="button"
          aria-label={`Зменшити на ${step}`}
          disabled={count <= min}
          onClick={() => setCount((value) => Math.max(min, value - step))}
        >−</button>
        <button
          type="button"
          aria-label={`Збільшити на ${step}`}
          disabled={count >= max}
          onClick={() => setCount((value) => Math.min(max, value + step))}
        >+</button>
        <button type="button" onClick={() => setCount(startingValue)}>Скинути</button>
      </div>
    </Widget>
  )
}

export default Counter
