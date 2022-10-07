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
  return (
    <div class="result">
      <div class="round">
        <p>Round {props.round}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>HP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>You</th>
            <th>1</th>
            <th>{parseInt(props.attack[7])}</th>
          </tr>
          <tr>
            <th>Dragon</th>
            <th>4</th>
            <th>{parseInt(props.attack[8])}</th>
          </tr>
        </tbody>
      </table>
      {/* critical/good success X cutting damage.  failure   */}
      <div class="desc">
        <p>
          <span class="hero">You</span> attack{" "}
          <span class="monster">Dragon</span>,{" "}
          {parseInt(props.attack[11]) == 1 ? (
            <span>
              {parseInt(props.attack[11]) == 20
                ? "critical success"
                : "good success"}{" "}
              <span class="damage">
                {parseInt(props.attack[11]) == 20
                  ? parseInt(props.attack[9]) * 10
                  : parseInt(props.attack[9]) * 5}
              </span>{" "}
              cutting damage
            </span>
          ) : (
            <span>bad failure </span>
          )}
        </p>
        {props.defend && (
          <p>
            <span class="monster">Dragon</span> attacks{" "}
            <span class="hero">You</span>,{" "}
            {parseInt(props.defend[11]) == 1 ? (
              <span>
                {parseInt(props.defend[11]) == 20
                  ? "critical success"
                  : "good success"}{" "}
                <span class="damage">
                  {parseInt(props.defend[11]) == 20
                    ? parseInt(props.defend[9]) * 10
                    : parseInt(props.defend[9]) * 5}
                </span>{" "}
                cutting damage
              </span>
            ) : (
              <span>bad failure </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

function Game() {
  const [provider, setProvider] = useState("");
  const [address, setAddress] = useState("");
  const [combatting, setCombatting] = useState(false);
  const [events, setEvents] = useState([]);
  const [final, setFinal] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const combatKey =
    "0x250f83f2365231571f91f0649c14039ca8563fe4ecdf12dbe3ce4c731719151";

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
      setFinal(0);

      await provider.waitForTransaction(txHash);

      setCombatting(false);
      setFinal(2);
      getEvents(txHash);

      //   getEvents(
      //     "0x5cdaf482a7f729da620c38684a8f8a777c3bd6682471f048c86987cab47128e"
      //   );
    } catch (error) {
      alert(error.message);
    }
  };

  const getEvents = async (txHash) => {
    try {
      const { events: events } = await defaultProvider.getTransactionReceipt(
        txHash
      );
      console.log(events);
      setEvents(events);
    } catch (error) {
      alert(error.message);
    }
  };

  function renderResult() {
    const results = [];
    let attack = [];
    let defend = [];
    let i = 0;
    for (i = 0; i < events.length; i++) {
      if (events[i]["keys"][0] == combatKey) {
        if (i % 2 == 0) {
          attack = events[i]["data"];
        } else {
          defend = events[i]["data"];
          results.push(
            <Board
              round={Math.floor(i / 2) + 1}
              attack={attack}
              defend={defend}
            />
          );
        }
      }
    }

    if (events.length % 2 == 1) {
      results.push(
        <Board round={Math.floor(i / 2) + 1} attack={attack} defend={null} />
      );

      setFinal(1);
    }

    return results;
  }

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
        {final >= 1 && <div>{renderResult()}</div>}
      </div>

      {/* final result */}
      {final >= 1 && (
        <div class="final">
          {final == 1 ? (
            <p class="win">
              You have defeated the dragon! Continue on your way...
            </p>
          ) : (
            <p class="lose">
              You were defeated by the dragon! You are too weak...
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
