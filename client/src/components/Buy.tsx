import { ChangeEvent, FormEvent, useState } from "react";
import { AppState } from "../App";
import { RotatingLines } from "react-loader-spinner";
import { ethers } from "ethers";

interface IBuy {
  state: AppState;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Buy = ({ state, isLoading, setIsLoading }: IBuy) => {
  const [inputValues, setInputValues] = useState({
    name: "",
    message: "",
    amount: 0,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const buyChai = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.contract) {
      const amount = {
        value: ethers.utils.parseEther(inputValues.amount.toString()),
      };
      const transaction = await state.contract.buyChai(
        inputValues.name,
        inputValues.message,
        amount,
      );
      setIsLoading(true);
      await transaction.wait();
      console.log("Transaction completed");
      console.log(transaction.hash);
      setIsLoading(false);
    }
  };

  console.log(inputValues);

  return (
    <form onSubmit={buyChai}>
      {isLoading ? (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible={true}
        />
      ) : (
        <>
          <input
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
            placeholder="Enter Name"
          />
          <input
            type="text"
            name="message"
            value={inputValues.message}
            onChange={handleInputChange}
            placeholder="Enter message"
          />
          <input
            type="number"
            name="amount"
            value={inputValues.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
          />

          <button type="submit">Pay</button>
        </>
      )}
    </form>
  );
};

export default Buy;
