import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { createContext, useContext } from "react";

type MarketContextData = {
  contract: ethers.Contract | null;
  totalStake: number;
  account: string | null | undefined;
};

const MarketContext = createContext({} as MarketContextData);

export const MarketProvider: React.FC = ({ children }) => {
  const { account, chainId, library } = useWeb3React();
  const totalStake = 0;
  return (
    <MarketContext.Provider
      value={{
        contract: null,
        account,
        totalStake,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarketContext = (): MarketContextData =>
  useContext(MarketContext);

export default MarketContext;
