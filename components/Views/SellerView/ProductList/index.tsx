import React from "react";
import { Button } from "react-bootstrap";
import { useMarketContext } from "@/libs/marketContext";
import Card from "@/components/Cards";

type Props = {};

export default function ProductList({}: Props) {
  const {totalStake} = useMarketContext();
  const productList = [];

  if (productList.length === 0) {
    return (
      <Card title="Listings">
        <p>You don&apos;t have any listing yet.</p>
        <Button disabled={totalStake.gt(0)}>Create Listing</Button>
      </Card>
    );
  }

  return <Card title="Listings">You don&apos;t have any listing yet.</Card>;
}
