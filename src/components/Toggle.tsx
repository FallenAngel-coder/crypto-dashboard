import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import Widget from './Widget'

type ToggleProps = {
  title: string
}

function Toggle({ title }: ToggleProps) {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('Toggle потребує ThemeProvider')
  }

  const { theme, toggleTheme } = context
  const isDark = theme === 'dark'

  return (
    <Widget title={title}>
      {isDark ? <p>Активний режим: темний.</p> : <p>Активний режим: світлий.</p>}
      <button type="button" aria-pressed={isDark} onClick={toggleTheme}>
        Перемкнути оформлення
      </button>
    </Widget>
  )
}

export default Toggle
