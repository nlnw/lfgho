import {
  InterestRate,
  Pool,
  type EthereumTransactionTypeExtended,
} from "@aave/contract-helpers";

import { AaveV3Sepolia } from "@bgd-labs/aave-address-book";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.public.blastapi.io",
);
provider.getSigner();

const pool = new Pool(provider, {
  POOL: AaveV3Sepolia.UI_POOL_DATA_PROVIDER,
  WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
});

export async function getTransactions(user: `0x${string}`) {
  /*
- @param `user` The ethereum address that will receive the borrowed amount 
- @param `reserve` The ethereum address of the reserve asset 
- @param `amount` The amount to be borrowed, in human readable units (e.g. 2.5 ETH)
- @param `interestRateMode`//Whether the borrow will incur a stable (InterestRate.Stable) or variable (InterestRate.Variable) interest rate
- @param @optional `debtTokenAddress` The ethereum address of the debt token of the asset you want to borrow. Only needed if the reserve is ETH mock address 
- @param @optional `onBehalfOf` The ethereum address for which user is borrowing. It will default to the user address 
*/
  const txs: EthereumTransactionTypeExtended[] = await pool.borrow({
    user: user,
    reserve: AaveV3Sepolia.ASSETS.GHO.UNDERLYING,
    amount: "10000000",
    interestRateMode: InterestRate.Variable,
    debtTokenAddress: AaveV3Sepolia.ASSETS.GHO.V_TOKEN,
    onBehalfOf: user,
    referralCode: "0",
  });

  // console.log(txs[0].tx());
  return txs;
}

// const txs: EthereumTransactionTypeExtended[] = await pool.repay({
//   user,
//   reserve: AaveV3Sepolia.ASSETS.GHO.UNDERLYING,
//   amount,
//   interestRateMode,
//   onBehalfOf,
// });
