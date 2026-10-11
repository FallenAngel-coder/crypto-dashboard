import DashboardContainer from './components/DashboardContainer'
import './App.css'

function App() {
  return (
    <main className="dashboard">
      <h1>Крипторинок</h1>
      <p className="intro">Ціни монет у USD та зміна за 24 години.</p>
      <DashboardContainer />
    </main>
  )
}

export default App
