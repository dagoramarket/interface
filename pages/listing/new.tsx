import NewListing from "@/components/Views/NewListing";
import { useMarketContext } from "@/libs/marketContext";
import { getCategories } from "@/utils/categories";
import Navigation from "@views/Navigation";
import Head from "next/head";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

type Props = {
  categories: string[];
};

export function NewListingPage({}: Props): JSX.Element {
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
      <Container className="pb-10">
        <Row className="justify-center">
          <Col sm={8}>
            <NewListing />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export async function getStaticProps(): Promise<{ props: Props }> {
  const categories = await getCategories();
  return { props: { categories } };
}

export default NewListingPage;
