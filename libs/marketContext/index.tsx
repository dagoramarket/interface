import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, constants, utils } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  StakeManager,
  StakeManager__factory,
} from "@/types/ethers-contracts";
import { DagoraToken } from "@/types/ethers-contracts/DagoraToken";
import { DagoraToken__factory } from "@/types/ethers-contracts/factories/DagoraToken__factory";
import {
  DAGORA_TOKEN_ADDRESS,
  DEPLOYED_CHAIN_ID,
  STAKEMANAGER_ADDRESS,
} from "@/libs/contract";

type MarketContextData = {
  totalStake: BigNumber;
  account: string | null | undefined;
  connected: boolean;
  stake: (amount: BigNumber) => Promise<void>;
  unstake: (amount: BigNumber) => Promise<void>;
};

const MarketContext = createContext({} as MarketContextData);

export const MarketProvider: React.FC = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const { isActive, account, chainId, provider } = useWeb3React();
  const [totalStake, setTotalStake] = useState(BigNumber.from(0));
  const [stakeManager, setStakeManager] = useState<StakeManager>();
  const [dgr, setDGR] = useState<DagoraToken>();

  useEffect(() => {
    if (chainId === undefined) return;
    if (!(provider instanceof Web3Provider)) return;
    const stakeManager = StakeManager__factory.connect(
      STAKEMANAGER_ADDRESS,
      provider.getSigner()
    );
    const dagoraToken = DagoraToken__factory.connect(
      DAGORA_TOKEN_ADDRESS,
      provider.getSigner()
    );
    setStakeManager(stakeManager);
    setDGR(dagoraToken);
  }, [chainId, provider]);

  const updateTotalStake = useCallback(async () => {
    if (!stakeManager) return;
    if (!account) return;
    const balance = await stakeManager.balance(account);
    setTotalStake(balance);
  }, [account, stakeManager]);

  useEffect(() => {
    updateTotalStake();
  }, [updateTotalStake]);

  useEffect(() => {
    setConnected(isActive && chainId === DEPLOYED_CHAIN_ID);
  }, [isActive, chainId]);

  async function stake(amount: BigNumber) {
    if (!stakeManager) return;
    if (!dgr) return;
    if (!account) return;

    const allowance = await dgr.allowance(account, stakeManager.address);
    if (allowance.lt(BigNumber.from(amount))) {
      const tx = await dgr.approve(stakeManager.address, constants.MaxUint256);
      await tx.wait();
    }
    const stakeTx = await stakeManager.stakeTokens(amount);
    await stakeTx.wait();
    updateTotalStake();
  }

  async function unstake(amount: BigNumber) {
    if (!stakeManager) return;
    if (!dgr) return;
    if (!account) return;

    const unstakeTx = await stakeManager.unstakeTokens(amount);
    await unstakeTx.wait();
    updateTotalStake();
  }

  return (
    <MarketContext.Provider
      value={{
        account,
        totalStake,
        connected,
        stake,
        unstake,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarketContext = (): MarketContextData =>
  useContext(MarketContext);

export default MarketContext;
