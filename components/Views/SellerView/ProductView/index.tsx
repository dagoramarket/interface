import Card from "@/components/Cards";
import { useMarketContext } from "@/libs/marketContext";
import ProductList from "./ProductList";

type Props = {};

export default function ProductView({}: Props) {
  const { account } = useMarketContext();

  if (!account) {
    return (
      <Card title="Listings">
        <p>Please connect your wallet.</p>
      </Card>
    );
  }
  return (
    <Card title="Listings">
      <ProductList account={account} />
    </Card>
  );
}
