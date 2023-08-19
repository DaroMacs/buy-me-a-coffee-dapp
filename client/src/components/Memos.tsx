import { useEffect, useState } from "react";
import { AppState } from "../App";

interface IMemos {
  state: AppState;
  isLoading: boolean;
}

type Memo = {
  name: string;
  message: string;
  amount: number;
  timeStamp: number;
};

const Memos = ({ state, isLoading }: IMemos) => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      if (contract) {
        const memos = await contract.getMemos();
        console.log(memos);
        setMemos(memos);
      }
    };
    contract && memosMessage();
  }, [contract, isLoading]);

  return (
    <div>
      <p>Memos:</p>
      {memos.map((memo, i) => {
        console.log(memo);

        return (
          <div style={{ display: "flex", gap: "14px" }}>
            <p>Memo#{i + 1}:</p>
            <p>{memo.name}</p>
            <p>{memo.message}</p>
            <p>{new Date(memo.timeStamp * 1000).toLocaleDateString()}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Memos;
