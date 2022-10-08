import "./App.css";

import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { connect } from "get-starknet";

import { UserContext } from "./contexts/user.context";

function Header() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log(currentUser);

  const connectWallet = async () => {
    try {
      const starknet = await connect();
      await starknet.enable({ starknetVersion: "v4" });

      const user = {
        provider: starknet.account,
        address: starknet.selectedAddress,
        isConnected: true,
      };
      setCurrentUser(user);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <header class="App-header">
        {currentUser.isConnected && (
          <button className="connect">
            {currentUser.address.slice(0, 5)}...{currentUser.address.slice(60)}
          </button>
        )}
      </header>
      {!currentUser.isConnected && (
        <button className="button" onClick={() => connectWallet()}>
          Connect Wallet
        </button>
      )}

      <Outlet />
    </div>
  );
}

export default Header;
