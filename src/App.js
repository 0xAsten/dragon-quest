import "./App.css";
import React, { useState } from "react";

import { connect } from "get-starknet";
import { Contract, hash, Provider, defaultProvider } from "starknet";

import dragonQuestAbi from "./abis/dragonQuest_abi.json";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  function renderSquare(i) {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [provider, setProvider] = useState("");
  const [address, setAddress] = useState("");
  const [combatting, setCombatting] = useState(false);
  const [events, setEvents] = useState([]);
  //   const [retrievedName, setRetrievedName] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const contractAddress =
    "0x016547928db65c71d9068a719c8f647861c85b945b658406ad5150bc4bc96ce7";

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

  const combat = async () => {
    try {
      const contract = new Contract(dragonQuestAbi, contractAddress, provider);
      const { transaction_hash: txHash } = await contract.combat([1, 0]);

      setCombatting(true);

      await provider.waitForTransaction(txHash);

      setCombatting(false);

      getEvents(txHash);
    } catch (error) {
      alert(error.message);
    }
  };

  const getEvents = async (txHash) => {
    try {
      const { events: events } = await defaultProvider.getTransactionReceipt(
        txHash
      );

      setEvents(events);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <header class="App-header">
        {isConnected && (
          <button className="connect">
            {address.slice(0, 5)}...{address.slice(60)}
          </button>
        )}
      </header>

      <div>
        <h1 className="title">Dragon Quest</h1>
      </div>

      <main className="App-main">
        {!isConnected && (
          <button className="button" onClick={() => connectWallet()}>
            Connect Wallet
          </button>
        )}

        {isConnected && (
          <div>
            <p className="description">
              So you want to be a hero? Well let me have a look at you then! Go
              slaying the dragon to prove you are the kind of fine young souls
              who may just have a chance.
            </p>

            {!combatting && (
              <button className="button" onClick={() => combat()}>
                Go Adventure
              </button>
            )}
          </div>
        )}
      </main>

      <div>
        {combatting && (
          <div class="scene">
            <img src={process.env.PUBLIC_URL + "red-dragon.png"}></img>
          </div>
        )}

        <div class="result"></div>
      </div>
    </div>
  );
}

export default Game;
