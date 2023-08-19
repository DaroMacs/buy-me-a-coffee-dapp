import { useState, useEffect } from "react";
import "./App.css";
import abi from "./contractJson/BuyMeACoffee.json";
import { ethers } from "ethers";
import { ExternalProvider } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

type AppState = {
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  contract?: ethers.Contract;
};

function App() {
  const [state, setState] = useState<AppState>({});
  const [account, setAccount] = useState("");

  useEffect(() => {
    const template = async () => {
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as string;
      const contractABI = abi.abi;

      try {
        if (window.ethereum && window.ethereum.request) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          if (accounts.length > 0) {
            setAccount(accounts[0]); // assuming you want the first account
          }

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer,
          );

          setState({ provider, signer, contract });

          console.log(account);
        } else {
          console.error(
            "Ethereum provider (e.g., MetaMask) not detected in window",
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    template();
  }, [account]);

  const buyChai = async () => {
    if (state.contract) {
      const amount = { value: ethers.utils.parseEther("0.001") };
      const transaction = await state.contract.buyChai("na", "na", amount);
      await transaction.wait();
      console.log("Transaction completed");
      console.log(transaction);
    }
  };

  return (
    <>
      <div>Test</div>
      <button onClick={buyChai}>BUY</button>
    </>
  );
}

export default App;
