import React from "react";
import { Button } from "react-bootstrap";
import { useMarketContext } from "@/libs/marketContext";
import Card from "@/components/Cards";

type Props = {};

export default function ProductList({}: Props) {
  const { totalStake, hasMinimumStake } = useMarketContext();
  const productList = [];

  if (productList.length === 0) {
    return (
      <Card title="Listings">
        <p>You don&apos;t have any listing yet.</p>
        <Button disabled={!hasMinimumStake} href="/listing/new">
          {hasMinimumStake ? "Create Listing" : "You need to stake first"}
        </Button>
      </Card>
    );
  }

  return <Card title="Listings">You don&apos;t have any listing yet.</Card>;
}
