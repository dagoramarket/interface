import ValidListing from "@/components/Views/ListingView/ValidListing";
import {
  Listing,
  ListingByHashDocument,
  ListingByHashQuery,
  ListingByHashQueryVariables,
  ListingFragment,
} from "@/graphql/generated";
import { getCategories } from "@/utils/categories";
import Navigation from "@views/Navigation";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import { apolloClient } from "../_app";

type Props = {
  categories: string[];
  listing?: ListingFragment;
};

export function Listing({ listing }: Props): JSX.Element {
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
      <Container>
        <Row className="justify-center">
          <Col sm={6}>
            <ValidListing listing={listing} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

type StaticContext = {
  params: {
    id: string;
  };
};

export async function getStaticProps({
  params: { id },
}: StaticContext): Promise<{ props: Props }> {
  const categories = await getCategories();
  const {
    data: { activeListings },
  } = await apolloClient.query<ListingByHashQuery, ListingByHashQueryVariables>(
    {
      query: ListingByHashDocument,
      variables: { hash: id },
    }
  );
  if (activeListings.length > 0)
    return { props: { categories, listing: activeListings[0] } };

  return { props: { categories } };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // false or 'blocking'
  };
}

export default Listing;
