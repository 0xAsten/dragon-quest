import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/user.context'
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
const connectors = [
  new InjectedConnector({ options: { id: 'argentX' } }),
  new InjectedConnector({ options: { id: 'braavos' } }),
]

root.render(
  <StarknetConfig connectors={connectors}>
    <React.StrictMode>
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </React.StrictMode>
  </StarknetConfig>
)
