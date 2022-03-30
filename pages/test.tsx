import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import ConnectWallet from "@views/ConnectWallet";
import Navigation from "@views/Navigation";
import { getCategories } from "@/utils/categories";

type Props = {
  categories: string[];
};

export function Test({ categories }: Props): JSX.Element {
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
      <Navigation categories={categories} />
      <Container>
        <Row className="justify-center">
          <Col sm={6}>
            <ConnectWallet />
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

export default Test;
