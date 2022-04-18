import { useSellerListingsQuery } from "@/graphql/generated";
import { useMarketContext } from "@/libs/marketContext";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SellerProduct from "./SellerProduct";

type Props = {
  account: string;
};

const PAGE_SIZE = 5;

export default function ProductList({ account }: Props) {
  const { hasMinimumStake } = useMarketContext();
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(-1);

  const { data, loading, error, fetchMore } = useSellerListingsQuery({
    variables: {
      seller: account.toLowerCase(),
      first: PAGE_SIZE,
      skip: page * PAGE_SIZE,
    },
  });

  useEffect(() => {
    if (data?.listings.length === 0 && page > 0) {
      setMaxPage(page - 1);
      setPage(page - 1);
    }
  }, [data, setPage, page]);

  const productList = data?.listings;

  if (!productList || productList.length === 0) {
    return (
      <>
        <p>You don&apos;t have any listing yet.</p>
        <Button disabled={!hasMinimumStake} href="/listing/new">
          {hasMinimumStake ? "Create Listing" : "You need to stake first"}
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="flex gap-3 flex-col">
        {productList.map((product) => {
          return <SellerProduct key={product.id} listing={product} />;
        })}
      </div>

      <Button
        onClick={async () => {
          const newPage = page - 1;
          await fetchMore({
            variables: {
              skip: newPage * PAGE_SIZE,
            },
          });
          setPage(newPage);
        }}
        disabled={page === 0}
      >
        Prev Page
      </Button>
      <Button
        onClick={async () => {
          const newPage = page + 1;
          await fetchMore({
            variables: {
              skip: newPage * PAGE_SIZE,
            },
          });

          setPage(newPage);
        }}
        disabled={productList.length < PAGE_SIZE || maxPage === page}
      >
        Next Page
      </Button>
    </>
  );
}
