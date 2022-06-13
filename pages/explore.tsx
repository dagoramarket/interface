import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import ConnectWallet from "@views/ConnectWallet";
import Navigation from "@views/Navigation";
import { getCategories } from "@/utils/categories";
import ListingExplorer from "@/components/Views/ListingExplorer";

type Props = {
  categories: string[];
};

export function Explore({}: Props): JSX.Element {
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
      <ListingExplorer />
    </>
  );
}

export async function getStaticProps(): Promise<{ props: Props }> {
  const categories = await getCategories();
  return { props: { categories } };
}

export default Explore;
