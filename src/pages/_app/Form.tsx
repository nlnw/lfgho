import { AaveV3Sepolia } from "@bgd-labs/aave-address-book";
import { useAccount, useContractWrite } from "wagmi";
import abi from "./abis/aave.json";

export const Form = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: AaveV3Sepolia.POOL,
    abi: abi,
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = parseInt(formData.get("value") as string, 10);
    const action = formData.get("action") as string;
    if (action === "Repay") {
      write({
        functionName: "repay",
        args: [
          AaveV3Sepolia.ASSETS.GHO.UNDERLYING,
          BigInt(value) * 10n ** 18n,
          2,
          address,
        ],
      } as any);
    } else if (action === "Borrow") {
      write({
        functionName: "borrow",
        args: [
          AaveV3Sepolia.ASSETS.GHO.UNDERLYING,
          BigInt(value) * 10n ** 18n,
          2,
          0,
          address,
        ],
      } as any);
    }
  }

  if (isDisconnected || isConnecting) return <div></div>;
  return (
    <form onSubmit={submit}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="af-account-gender-checkbox"
            className="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
          >
            Action
          </label>
        </div>

        <div className="sm:col-span-9">
          <div className="sm:flex">
            <select
              className="block w-full rounded-lg border-gray-200 px-3 py-2 pe-9 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
              name="action"
            >
              <option selected>Borrow</option>
              <option>Repay</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="value"
            className="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
          >
            Amount
          </label>
        </div>

        <div className="sm:col-span-9">
          <input
            id="value"
            name="value"
            type="number"
            className="block w-full rounded-lg border-gray-200 px-3 py-2 pe-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
            required
          />
        </div>
      </div>

      <div className="mb-4 mt-5 flex justify-center gap-x-2">
        <button
          type="submit"
          disabled={!write || isLoading}
          className="items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          Commit
        </button>
      </div>
      {isSuccess && (
        <div>
          <a
            href={`https://sepolia.etherscan.io/tx/${data?.hash}`}
            target="_blank"
            className="font-bold text-blue-600 hover:underline"
          >
            Transaction
          </a>
        </div>
      )}
    </form>
  );
};
