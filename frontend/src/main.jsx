import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { store } from './store/StoreIndex.js'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { CartItemsProvider } from './contexts/CartItemsContext.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <AuthProvider>
          <CartItemsProvider>
            <App /> 
          </CartItemsProvider>
        </AuthProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>,
)
