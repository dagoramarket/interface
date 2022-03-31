import { parseEther } from "ethers/lib/utils";

// 5 MB
export const MAX_FILE_SIZE = 5242880;
export const IPFS_ENDPOINT = "https://dagora.infura-ipfs.io/ipfs/";

export type Token = {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
};

export interface IHash {
  [details: string]: Token;
}

export const ENABLED_TOKENS: IHash = {
  DAI: {
    name: "DAI",
    symbol: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 18,
  },
  USDC: {
    name: "USDC",
    symbol: "USDC",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
  },
  Ether: {
    name: "Ether",
    symbol: "ETH",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    decimals: 18,
  },
  WTBC: {
    name: "WTBC",
    symbol: "WTBC",
    address: "0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098",
    decimals: 18,
  },
  DGR: {
    name: "DGR",
    symbol: "DGR",
    address: "0x783EECa49C84A33382e39e8571F248a1E91C20BB",
    decimals: 18,
  },
};
