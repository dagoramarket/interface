import { metaMask } from "@/connectors/metamask";
import { BLOCK_TIME } from "@/constants";
import {
  DAGORA_TOKEN_ADDRESS,
  DEPLOYED_CHAIN_ID,
  LISTINGMANAGER_ADDRESS,
  STAKEMANAGER_ADDRESS,
} from "@/libs/contract";
import {
  ListingManager,
  ListingManager__factory,
  StakeManager,
  StakeManager__factory,
} from "@/types/ethers-contracts";
import { DagoraToken } from "@/types/ethers-contracts/DagoraToken";
import { DagoraToken__factory } from "@/types/ethers-contracts/factories/DagoraToken__factory";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, constants } from "ethers";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type MarketContextData = {
  totalStake: BigNumber;
  account: string | null | undefined;
  connected: boolean;
  categories: string[];
  hasMinimumStake: boolean;
  minimumStake: BigNumber;
  stake: (amount: BigNumber) => Promise<void>;
  unstake: (amount: BigNumber) => Promise<void>;
  createListing: (ipfsHash: string) => Promise<void>;
  updateCategories: (categories: string[]) => void;
};

const MarketContext = createContext({} as MarketContextData);

export const MarketProvider: React.FC = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const { isActive, account, chainId, provider } = useWeb3React();
  const [totalStake, setTotalStake] = useState(BigNumber.from(0));
  const [stakeManager, setStakeManager] = useState<StakeManager>();
  const [listingManager, setListingManager] = useState<ListingManager>();
  const [dgr, setDGR] = useState<DagoraToken>();
  const [categories, setCategories] = useState<string[]>([]);
  const [hasMinimumStake, setHasMinimumStake] = useState(false);
  const [minimumStake, setMinimumStake] = useState(constants.MaxUint256);
  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  const updateMinimumStake = useCallback(async () => {
    if (!listingManager) return;

    const minimumStake = await listingManager.MINIMUM_STAKED_TOKEN();
    setMinimumStake(minimumStake);
  }, [listingManager]);

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
    const listingManager = ListingManager__factory.connect(
      LISTINGMANAGER_ADDRESS,
      provider.getSigner()
    );
    setStakeManager(stakeManager);
    setListingManager(listingManager);
    setDGR(dagoraToken);
  }, [chainId, provider]);

  const updateTotalStake = useCallback(async () => {
    if (!stakeManager) return;
    if (!account) return;
    const balance = await stakeManager.balance(account);
    setTotalStake(balance);
  }, [account, stakeManager]);

  useEffect(() => {
    setHasMinimumStake(totalStake.gte(minimumStake));
  }, [totalStake, minimumStake]);

  useEffect(() => {
    updateTotalStake();
    updateMinimumStake();
  }, [updateTotalStake, updateMinimumStake]);

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
    await updateTotalStake();
  }

  async function unstake(amount: BigNumber) {
    if (!stakeManager) return;
    if (!dgr) return;
    if (!account) return;

    const unstakeTx = await stakeManager.unstakeTokens(amount);
    await unstakeTx.wait();
    await updateTotalStake();
  }

  async function createListing(ipfsHash: string) {
    if (!listingManager) return;
    if (!account) return;
    if (!provider) return;

    const bn = await provider.getBlockNumber();
    const blocks = Math.floor((60 * 60 * 24 * 30) / BLOCK_TIME); // 30 days in blocks
    
    const listing = {
      ipfsHash,
      seller: account,
      commissionPercentage: 0,
      warranty: 0,
      cashbackPercentage: 0,
      expirationBlock: bn + blocks,
    };
    console.log(listing);
    const tx = await listingManager.createListing(listing, 1);
    await tx.wait();
  }

  return (
    <MarketContext.Provider
      value={{
        account,
        totalStake,
        connected,
        categories,
        hasMinimumStake,
        minimumStake,
        stake,
        unstake,
        createListing,
        updateCategories: setCategories,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarketContext = (): MarketContextData =>
  useContext(MarketContext);

export default MarketContext;
