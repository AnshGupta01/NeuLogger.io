import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";
import Base from "../Components/Base";
import backgroundImage from "../background_image.jpg";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Base>
        <Container>
          <Row className="mt-4">
            <Col sm={{ size: 5, offset: 2 }}>
              <Card color="black" outline style={{ width: "50rem" }} mx-auto>
                <img
                  alt="Blogging Application"
                  src="https://www.searchenginejournal.com/wp-content/uploads/2020/08/7-ways-a-blog-can-help-your-business-right-now-5f3c06b9eb24e-1520x800.webp"
                />
                <CardBody>
                  <CardTitle tag="h5">Blogging Application</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    by Ansh
                  </CardSubtitle>
                  <CardText>
                    Hi there, I am Ansh Gupta, a 3rd year student at Amity
                    University. I've created this full stack Application using
                    Spring-boot, ReactJS, MySQL, and ReactStrap. I hope you like
                    it.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
};
export default Home;
