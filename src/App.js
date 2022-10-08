import "./App.css";
import React, { useState } from "react";

import { connect } from "get-starknet";

import Header from "./Header";
import Quest from "./Quest";

function Game() {
  const [provider, setProvider] = useState("");
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const starknet = await connect();
      await starknet.enable({ starknetVersion: "v4" });
      setProvider(starknet.account);
      setAddress(starknet.selectedAddress);
      setIsConnected(true);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <header class="App-header">
        {isConnected && <Header address={address} />}
      </header>

      {!isConnected && (
        <button className="button" onClick={() => connectWallet()}>
          Connect Wallet
        </button>
      )}
      <Quest provider={provider} isConnected={isConnected} />
    </div>
  );
}

export default Game;
