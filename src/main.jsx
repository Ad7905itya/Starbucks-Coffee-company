import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import ContextSwiper from './contexts/SwiperData.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ContextSwiper>
        <App />
      </ContextSwiper>
    </HelmetProvider>
  </StrictMode>,
)
