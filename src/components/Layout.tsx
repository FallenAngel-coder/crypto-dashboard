import { Outlet } from 'react-router'
import Toggle from './Toggle'

function Layout() {
  return (
    <main className="dashboard">
      <h1>Крипторинок</h1>
      <div className="theme-control">
        <Toggle title="Тема застосунку" />
      </div>
      <Outlet />
    </main>
  )
}

export default Layout
