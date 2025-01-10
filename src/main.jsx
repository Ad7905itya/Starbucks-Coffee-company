import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import CartItemsContext from './contexts/CartItemsContext.jsx'
import { Provider } from 'react-redux'
import { store } from './store/StoreIndex.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <CartItemsContext>
          <App />
        </CartItemsContext>
      </Provider>
    </HelmetProvider>
  </StrictMode>,
)
