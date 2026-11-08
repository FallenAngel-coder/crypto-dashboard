import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import ThemeProvider from './context/ThemeProvider'
import FiltersProvider from './context/FiltersProvider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FiltersProvider>
          <App />
        </FiltersProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
