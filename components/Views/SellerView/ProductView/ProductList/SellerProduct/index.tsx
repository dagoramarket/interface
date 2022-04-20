import { IPFS_ENDPOINT } from "@/constants";
import { convertToReadableDate } from "@/utils/date_utils";
import { Card, Col, Image, Row } from "react-bootstrap";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: any;
  media: string[];
  commissionPercentage: any;
  cashbackPercentage: any;
  expirationBlock: any;
  quantity: any;
  allowedTokens: any[];
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
          {listing.media.length > 0 && (
            <Image
              src={IPFS_ENDPOINT + listing.media[0].replace("ipfs://", "")}
              alt={`Image for listing ${listing.id}`}
            />
          )}
        </Col>
        <Col md={9}>
          <Card.Body>
            <Card.Title>{listing.title}</Card.Title>
            <Card.Text>{listing.description}</Card.Text>
            <Card.Text>
              <small className="text-muted">
                Expires at block #
                {listing.expirationBlock}
              </small>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
