import "./App.css";

import React, { useState } from "react";
import { Contract, hash, Provider, defaultProvider } from "starknet";
import dragonQuestAbi from "./abis/dragonQuest_abi.json";

import Board from "./components/Board";
function Quest(props) {
  const [combatting, setCombatting] = useState(false);
  const [events, setEvents] = useState([]);
  const [final, setFinal] = useState(0);

  const combat = async () => {
    try {
      const contract = new Contract(
        dragonQuestAbi,
        contractAddress,
        props.provider
      );
      const { transaction_hash: txHash } = await contract.combat([1, 0]);

      setCombatting(true);
      setFinal(0);

      await props.provider.waitForTransaction(txHash);

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

  const contractAddress =
    "0x016547928db65c71d9068a719c8f647861c85b945b658406ad5150bc4bc96ce7";

  const combatKey =
    "0x250f83f2365231571f91f0649c14039ca8563fe4ecdf12dbe3ce4c731719151";

  return (
    <main className="App-main">
      {props.isConnected && (
        <div>
          <h1 className="title">Dragon Quest</h1>

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
        </div>
      )}

      <div class="final">
        {combatting && (
          <div class="scene">
            <img src={process.env.PUBLIC_URL + "red-dragon.png"}></img>
          </div>
        )}
        {/* {final >= 1 && } */}

        {/* final result */}
        {final >= 1 && (
          <div class="">
            <div>{renderResult()}</div>
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
    </main>
  );
}

export default Quest;