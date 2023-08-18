import { useState, useEffect } from "react";
import "./App.css";
import abi from "./contractJson/BuyMeACoffee.json";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

function App() {
  const [state, setState] = useState<any>({});
  const [account, setAccount] = useState("");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x200da7D8D222Fbd5dc98f154B8b714FB5D38CA9C";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer,
        );

        setState({ provider, signer, contract });

        console.log(account);
      } catch (error) {
        console.log(error);
      }
    };

    template();
  }, []);

  return (
    <>
      <div>VITE</div>
      <div>{account[1]}</div>
    </>
  );
}

export default App;
