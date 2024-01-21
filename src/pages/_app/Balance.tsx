import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { fetchContractData } from "./scripts/data";

export const Balance = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [bal, setBal] = useState<number>(-1);

  useEffect(() => {
    async function getBalance() {
      if (address === undefined) return;
      const { formattedGhoUserData } = await fetchContractData(address);
      setBal(formattedGhoUserData.userGhoBorrowBalance);
    }
    getBalance();
  }, [address]);

  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;

  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-200">
        GHO Debt
      </h4>
      <p className="font-bold text-blue-600 hover:underline">
        <a href="https://gho.aave.com" target="_blank">
          {bal > 0 ? bal : "Loading..."}
        </a>
      </p>
    </div>
  );
};
