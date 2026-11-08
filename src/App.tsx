import { Route, Routes } from 'react-router'
import Toggle from './components/Toggle'
import DashboardPage from './pages/DashboardPage'
import CoinDetailsPage from './pages/CoinDetailsPage'
import './App.css'

function App() {
  return (
    <main className="dashboard">
      <h1>Крипторинок</h1>
      <div className="theme-control">
        <Toggle title="Тема застосунку" />
      </div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/coin/:id" element={<CoinDetailsPage />} />
      </Routes>
    </main>
  )
}

export default App
