import Head from "next/head";
import Navigation from "@views/Navigation";
import SellerView from "@views/SellerView";
import { getCategories } from "@/utils/categories";

type Props = {
  categories: string[];
};

export function Account({}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Dagora Market</title>
        <meta
          name="description"
          content="Decentralized Marketplace for Physical Goods"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <SellerView />
    </>
  );
}

export async function getStaticProps(): Promise<{ props: Props }> {
  const categories = await getCategories();
  return { props: { categories } };
}

export default Account;
