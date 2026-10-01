import type { ReactNode } from 'react'

type WidgetProps = {
  title: string
  children: ReactNode
}

function Widget({ title, children }: WidgetProps) {
  return (
    <section className="widget">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default Widget
