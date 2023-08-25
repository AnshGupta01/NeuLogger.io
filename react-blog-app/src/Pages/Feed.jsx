import { Col, Container, Row } from "reactstrap";
import Base from "../Components/Base";
import NewFeed from "../Components/NewFeed";
import CategorySideMenu from "../Components/CategorySideMenu";

const Feed = () => {
  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-3">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <NewFeed />
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Feed;
