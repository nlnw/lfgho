import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useAccount, useContractRead, useSendTransaction } from "wagmi";
import abi from "./abis/gho.json";
import { fetchContractData } from "./scripts/data";

export const MyComponent = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data }: { data: bigint | undefined } = useContractRead({
    abi,
    address: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
    functionName: "balanceOf",
    args: [address],
  });
  const [bal, setBal] = useState<number>();
  const { data: hash, isLoading, sendTransaction } = useSendTransaction();

  useEffect(() => {
    async function getBalance() {
      if (address === undefined) return;
      const { formattedGhoUserData } = await fetchContractData(address);
      setBal(formattedGhoUserData.userGhoBorrowBalance);
    }
    getBalance();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <p>Connected Wallet: {address}</p>
      <p>Gho balance: {(data / 10n ** 18n).toString()}</p>
      <p>Gho balance2: {bal}</p>
      <form onSubmit={submit}>
        <input name="address" placeholder="0xA0Cf…251e" required />
        <input name="value" placeholder="0.05" required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Confirming..." : "Send"}{" "}
        </button>
        {hash && <div>Transaction Hash: {hash.toString()}</div>}
      </form>
    </div>
  );
};
