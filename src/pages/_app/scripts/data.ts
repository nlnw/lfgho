import {
  ChainId,
  GhoService,
  UiIncentiveDataProvider,
  UiPoolDataProvider,
} from "@aave/contract-helpers";
import {
  formatGhoReserveData,
  formatGhoUserData,
  formatReservesAndIncentives,
  formatUserSummaryAndIncentives,
} from "@aave/math-utils";
import { AaveV3Sepolia } from "@bgd-labs/aave-address-book";
import { ethers } from "ethers";

// Sample RPC address for querying ETH goerli
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.public.blastapi.io",
);

// View contract used to fetch all reserves data (including market base currency data), and user reserves
// Using Aave V3 Eth goerli address for demo
const poolDataProviderContract = new UiPoolDataProvider({
  uiPoolDataProviderAddress: AaveV3Sepolia.UI_POOL_DATA_PROVIDER,
  provider,
  chainId: ChainId.sepolia,
});
const currentTimestamp = Date.now();

// View contract used to fetch all reserve incentives (APRs), and user incentives
// Using Aave V3 Eth goerli address for demo
const incentiveDataProviderContract = new UiIncentiveDataProvider({
  uiIncentiveDataProviderAddress: AaveV3Sepolia.UI_INCENTIVE_DATA_PROVIDER,
  provider,
  chainId: ChainId.goerli,
});

const ghoService = new GhoService({
  provider,
  uiGhoDataProviderAddress: AaveV3Sepolia.UI_GHO_DATA_PROVIDER, // Goerli GHO Market
});

export async function fetchContractData(currentAccount: `0x${string}`) {
  // Object containing array of pool reserves and market base currency data
  // { reservesArray, baseCurrencyData }
  const reserves = await poolDataProviderContract.getReservesHumanized({
    lendingPoolAddressProvider: AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
  });

  // Object containing array or users aave positions and active eMode category
  // { userReserves, userEmodeCategoryId }
  const userReserves = await poolDataProviderContract.getUserReservesHumanized({
    lendingPoolAddressProvider: AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
    user: currentAccount,
  });

  // // Array of incentive tokens with price feed and emission APR
  const reserveIncentives =
    await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
      lendingPoolAddressProvider: AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
    });

  // // Dictionary of claimable user incentives
  const userIncentives =
    await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized({
      lendingPoolAddressProvider: AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
      user: currentAccount,
    });

  const ghoReserveData = await ghoService.getGhoReserveData();
  const ghoUserData = await ghoService.getGhoUserData(currentAccount);

  const formattedGhoReserveData = formatGhoReserveData({
    ghoReserveData,
  });
  const formattedGhoUserData = formatGhoUserData({
    ghoReserveData,
    ghoUserData,
    currentTimestamp,
  });

  const formattedPoolReserves = formatReservesAndIncentives({
    reserves: reserves.reservesData,
    currentTimestamp,
    marketReferenceCurrencyDecimals:
      reserves.baseCurrencyData.marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd:
      reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    reserveIncentives: reserveIncentives,
  });

  const userSummary = formatUserSummaryAndIncentives({
    currentTimestamp,
    marketReferencePriceInUsd:
      reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    marketReferenceCurrencyDecimals:
      reserves.baseCurrencyData.marketReferenceCurrencyDecimals,
    userReserves: userReserves.userReserves,
    formattedReserves: formattedPoolReserves,
    userEmodeCategoryId: userReserves.userEmodeCategoryId,
    reserveIncentives: reserveIncentives,
    userIncentives: userIncentives,
  });

  let formattedUserSummary = userSummary;
  // Factor discounted GHO interest into cumulative user fields
  // if (formattedGhoUserData.userDiscountedGhoInterest > 0) {
  //   const userSummaryWithDiscount = formatUserSummaryWithDiscount({
  //     userGhoDiscountedInterest: formattedGhoUserData.userDiscountedGhoInterest,
  //     user,
  //     marketReferenceCurrencyPriceUSD: Number(
  //       formatUnits(
  //         reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
  //         USD_DECIMALS,
  //       ),
  //     ),
  //   });
  //   formattedUserSummary = {
  //     ...userSummary,
  //     ...userSummaryWithDiscount,
  //   };
  // }

  return {
    formattedGhoReserveData,
    formattedGhoUserData,
    formattedPoolReserves,
    formattedUserSummary,
  };
}
