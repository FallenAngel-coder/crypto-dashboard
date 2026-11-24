import { useDashboardStore } from '../store/useDashboardStore'
import Widget from './Widget'

type ToggleProps = {
  title: string
}

function Toggle({ title }: ToggleProps) {
  const theme = useDashboardStore((state) => state.theme)
  const toggleTheme = useDashboardStore((state) => state.toggleTheme)
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
