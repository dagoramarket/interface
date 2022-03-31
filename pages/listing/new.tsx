import NewListing from "@/components/Views/NewListing";
import { getCategories } from "@/utils/categories";
import Navigation from "@views/Navigation";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";

type Props = {
  categories: string[];
};

export function NewListingPage({ categories }: Props): JSX.Element {
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
