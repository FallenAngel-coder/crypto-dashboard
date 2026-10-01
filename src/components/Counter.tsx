import { useState } from 'react'
import Widget from './Widget'

type CounterProps = {
  title: string
  initialValue: number
}

function Counter({ title, initialValue }: CounterProps) {
  const [count, setCount] = useState(initialValue)

  return (
    <Widget title={title}>
      <p className="counter-value" aria-live="polite">{count}</p>
      <div className="button-group">
        <button type="button" aria-label="Зменшити на 1" onClick={() => setCount((value) => value - 1)}>−</button>
        <button type="button" aria-label="Збільшити на 1" onClick={() => setCount((value) => value + 1)}>+</button>
        <button type="button" onClick={() => setCount(initialValue)}>Скинути</button>
      </div>
    </Widget>
  )
}

export default Counter
