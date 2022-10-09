import React, { useState, useContext, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Contract, uint256, number } from "starknet";

import { UserContext } from "./contexts/user.context";
import adventurerAbi from "./abis/adventurer_abi.json";

import "./App.css";

function Adventurer() {
  const { currentUser } = useContext(UserContext);

  const [count, setCount] = useState(-1);
  const [adventurers, setAdventurers] = useState([]);
  const [isMinting, setIsMinting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const contractAddress =
    "0x064c4c4e497c52b046c09f7565e61d2d2a5da9b020bc8c9fd50aff0371b7a6b0";

  const getAdventurers = async () => {
    try {
      setIsLoading(true);
      const contract = new Contract(
        adventurerAbi,
        contractAddress,
        currentUser.provider
      );
      const { balance: balance } = await contract.balanceOf(
        currentUser.address
      );

      const balanceOf = parseInt(number.toFelt(uint256.uint256ToBN(balance)));

      setCount(balanceOf);

      const results = [];
      for (let i = 0; i < balanceOf; i++) {
        const result = await getTokenByIndex(contract, i);
        results.push(result);
        setAdventurers([...results]);
      }
    } catch (error) {
      alert(error.message);
    }

    setIsLoading(false);
  };

  const getTokenByIndex = async (contract, i) => {
    const { tokenId: tokenId } = await contract.tokenOfOwnerByIndex(
      currentUser.address,
      uint256.bnToUint256(number.toBN(i))
    );

    const adventurerId = parseInt(number.toFelt(uint256.uint256ToBN(tokenId)));

    return (
      <div key={adventurerId} className="adventurer">
        <Link to={"/quest/" + adventurerId}>
          {/* <img src={process.env.PUBLIC_URL + "adventurer.png"} /> */}
          <img src={"/adventurer.png"} />
        </Link>
        <p># {adventurerId}</p>
      </div>
    );
  };

  const mintAdventurer = async () => {
    try {
      const contract = new Contract(
        adventurerAbi,
        contractAddress,
        currentUser.provider
      );

      setIsMinting(true);
      const { transaction_hash: txHash } = await contract.mint(
        currentUser.address,
        0,
        0,
        0,
        0
      );

      await currentUser.provider.waitForTransaction(txHash);
      const i = count;
      setCount(count + 1);
      const result = await getTokenByIndex(contract, i);
      const results = [...adventurers];
      results.push(result);
      setAdventurers(results);
    } catch (error) {
      alert(error.message);
    }

    setIsMinting(false);
  };

  useEffect(() => {
    if (currentUser.isConnected) getAdventurers();
  }, [currentUser.isConnected]);

  return (
    <Fragment>
      {currentUser.isConnected && (
        <button
          className="button"
          disabled={isMinting || isLoading}
          onClick={() => mintAdventurer()}
        >
          Mint An Adventurer
        </button>
      )}

      <div className="App-adventurer">
        {currentUser.isConnected && <Fragment>{adventurers}</Fragment>}
        {(isMinting || isLoading) && (
          <div className="adventurer-loading">
            <img></img>
          </div>
        )}
      </div>
      {count == 0 && !isMinting && !isLoading && (
        <p class="hint">No Adventurer Yet</p>
      )}
    </Fragment>
  );
}

export default Adventurer;
