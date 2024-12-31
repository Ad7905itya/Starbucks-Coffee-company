import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import CartItemsContext from './contexts/CartItemsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <CartItemsContext>
        <App />
      </CartItemsContext>
    </HelmetProvider>
  </StrictMode>,
)
