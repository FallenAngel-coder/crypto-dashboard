import { useState } from 'react'
import Widget from './Widget'

type ToggleProps = {
  title: string
}

function Toggle({ title }: ToggleProps) {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className={isDark ? 'toggle-dark' : 'toggle-light'}>
      <Widget title={title}>
        {isDark ? <p>Активний режим: темний.</p> : <p>Активний режим: світлий.</p>}
        <button type="button" aria-pressed={isDark} onClick={() => setIsDark((value) => !value)}>
          Перемкнути оформлення
        </button>
      </Widget>
    </div>
  )
}

export default Toggle
