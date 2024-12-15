import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import LocalStorageFormData from './contexts/LocalStorageFormData.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <LocalStorageFormData>
        <App />
      </LocalStorageFormData>
    </HelmetProvider>
  </StrictMode>,
)
