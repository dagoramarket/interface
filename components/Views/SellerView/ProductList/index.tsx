import { Button } from "react-bootstrap";
import { useMarketContext } from "@/libs/marketContext";
import Card from "@/components/Cards";
import { useListingsQuery } from "@/graphql/generated";
import SellerProduct from "./SellerProduct";
import { useState } from "react";

type Props = {};

const PAGE_SIZE = 10;

export default function ProductList({}: Props) {
  const { hasMinimumStake, account } = useMarketContext();
  const [page, setPage] = useState(0);

  const { data, loading, error, fetchMore } = useListingsQuery({
    variables: {
      seller: account ? account.toLowerCase() : "",
      first: PAGE_SIZE,
      skip: page * PAGE_SIZE,
    },
  });

  const productList = data?.listings;

  if (!productList || productList.length === 0) {
    return (
      <Card title="Listings">
        <p>You don&apos;t have any listing yet.</p>
        <Button disabled={!hasMinimumStake} href="/listing/new">
          {hasMinimumStake ? "Create Listing" : "You need to stake first"}
        </Button>
      </Card>
    );
  }

  return (
    <Card title="Listings">
      <div className="flex gap-3 flex-col">
        {productList.map((product) => {
          return <SellerProduct key={product.id} listing={product} />;
        })}
      </div>

      <Button
        onClick={() => {
          setPage(page - 1);
          fetchMore({
            variables: {
              skip: page * PAGE_SIZE,
            },
          });
        }}
        disabled={page === 0}
      >
        Prev Page
      </Button>
      <Button
        onClick={() => {
          setPage(page + 1);
          fetchMore({
            variables: {
              skip: page * PAGE_SIZE,
            },
          });
        }}
        disabled={productList.length < PAGE_SIZE}
      >
        Next Page
      </Button>
    </Card>
  );
}
