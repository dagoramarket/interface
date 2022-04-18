import { IPFS_ENDPOINT } from "@/constants";
import { convertToReadableDate } from "@/utils/date_utils";
import { Card, Col, Image, Row } from "react-bootstrap";

interface Listing {
  id: string;
  title?: string | null | undefined;
  description?: string | null | undefined;
  price: any;
  images: string[];
  commissionPercentage: any;
  cashbackPercentage: any;
  expiration: number;
}

type Props = {
  listing: Listing;
};

export default function SellerProduct({ listing }: Props) {
  return (
    <Card>
      <Card.Header className="text-xs text-muted">{listing.id}</Card.Header>
      <Row className="g-0">
        <Col md={3}>
          <Image
            src={IPFS_ENDPOINT + listing.images[0].replace("ipfs://", "")}
            alt={`Image for listing ${listing.id}`}
          ></Image>
        </Col>
        <Col md={9}>
          <Card.Body>
            <Card.Title>{listing.title}</Card.Title>
            <Card.Text>{listing.description}</Card.Text>
            <Card.Text>
              <small className="text-muted">
                Expires at {convertToReadableDate(listing.expiration)}
              </small>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
