import { useState, useEffect } from "react";
import "./App.css";
import abi from "./contractJson/BuyMeACoffee.json";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";

declare global {
  interface Window {
    // eslint-disable-next-line
    ethereum?: any;
  }
}

export type AppState = {
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  contract?: ethers.Contract;
};

function App() {
  const [state, setState] = useState<AppState>({});
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

          window.ethereum.on("accountsChanged", () => {
            console.log("changed");
            window.location.reload();
          });

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

  return (
    <>
      <div>Buy Me a Coffee</div>
      <div>Wallet: {account}</div>

      <Buy state={state} isLoading={isLoading} setIsLoading={setIsLoading} />
      <Memos state={state} isLoading={isLoading} />
    </>
  );
}

export default App;
