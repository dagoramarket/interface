import { ListingFragment } from "@/graphql/generated";
import { useMarketContext } from "@/libs/marketContext";
import { DagoraLib } from "@/types/ethers-contracts/OrderManager";
import { BigNumber } from "ethers";
import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  listing: ListingFragment;
  amount: BigNumber;
  token: string;
};

function BuyButton({ listing, amount, token }: Props) {
  const { createOrder } = useMarketContext();

  async function handleClick() {
    console.log("Buy button clicked");
    console.log(listing);
    const l: DagoraLib.ListingStruct = {
      cashbackPercentage: listing.cashbackPercentage,
      commissionPercentage: listing.commissionPercentage,
      expirationBlock: listing.expirationBlock,
      ipfsHash: listing.ipfsHash,
      seller: listing.seller.id,
      warranty: listing.warranty,
    };
    await createOrder(l, amount, token);
  }

  return <Button onClick={handleClick}>Buy</Button>;
}

export default BuyButton;
