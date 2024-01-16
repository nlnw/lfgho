import { useAccount, useContractRead } from "wagmi";
import abi from "./abis/gho.json";

export const MyComponent = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data }: { data: bigint | undefined } = useContractRead({
    abi,
    address: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
    functionName: "balanceOf",
    args: [address],
  });
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <p>Connected Wallet: {address}</p>
      <p>Gho balance: {(data / 10n ** 18n).toString()}</p>
    </div>
  );
};
