import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { Toaster } from './components/ui'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster className="font-dogicapixel" />
  </StrictMode>
)
