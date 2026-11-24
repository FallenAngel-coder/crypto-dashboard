import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import CoinDetailsPage from './pages/CoinDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import { useDashboardStore } from './store/useDashboardStore'
import './App.css'

function App() {
  const theme = useDashboardStore((state) => state.theme)

  return (
    <div className={`app theme-${theme}`}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/coin/:id" element={<CoinDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
