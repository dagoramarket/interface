import React from "react";
import { Button } from "react-bootstrap";
import { useMarketContext } from "@/libs/marketContext";
import Card from "@/components/Cards";
import { MINIMUM_STAKE } from "@/constants";

type Props = {};

export default function ProductList({}: Props) {
  const { totalStake } = useMarketContext();
  const productList = [];

  if (productList.length === 0) {
    return (
      <Card title="Listings">
        <p>You don&apos;t have any listing yet.</p>
        <Button disabled={totalStake.lt(MINIMUM_STAKE)} href="/listing/new">
          {totalStake.gte(MINIMUM_STAKE)
            ? "Create Listing"
            : "You need to stake first"}
        </Button>
      </Card>
    );
  }

  return <Card title="Listings">You don&apos;t have any listing yet.</Card>;
}
