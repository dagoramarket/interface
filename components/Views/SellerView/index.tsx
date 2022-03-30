import { Col, Container, Row } from "react-bootstrap";
import ProductList from "./ProductList";
import StakeBoard from "./StakeBoard";

type Props = {};

export default function SellerView({}: Props) {
  return (
    <Container>
      <Row>
        <Col sm={8}>
          <ProductList />
        </Col>
        <Col sm={4}>
          <StakeBoard />
        </Col>
      </Row>
    </Container>
  );
}
