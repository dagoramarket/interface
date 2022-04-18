import { Col, Container, Row } from "react-bootstrap";
import ProductView from "./ProductView";
import StakeBoard from "./StakeBoard";

type Props = {};

export default function SellerView({}: Props) {
  return (
    <Container>
      <Row>
        <Col sm={8}>
          <ProductView />
        </Col>
        <Col sm={4}>
          <StakeBoard />
        </Col>
      </Row>
    </Container>
  );
}
