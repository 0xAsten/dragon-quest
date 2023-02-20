import './App.css'

import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { UserContext } from './contexts/user.context'
import { useConnectors } from '@starknet-react/core'

function Header() {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const { connectors } = useConnectors()

  const connectWallet = async (connector) => {
    try {
      await connector.connect()

      const user = {
        account: connector._wallet.account,
        address: connector._wallet.selectedAddress,
        isConnected: connector._wallet.isConnected,
      }
      setCurrentUser(user)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className='App'>
      <header class='App-header'>
        {currentUser.isConnected && (
          <button className='connect'>
            {currentUser.address.slice(0, 5)}...{currentUser.address.slice(60)}
          </button>
        )}
      </header>
      {!currentUser.isConnected && (
        <ul>
          {connectors.map((connector) => (
            <li key={connector.id()}>
              <button class='button' onClick={() => connectWallet(connector)}>
                Connect {connector.id()}
              </button>
            </li>
          ))}
        </ul>
      )}

      <Outlet />
    </div>
  )
}

export default Header
