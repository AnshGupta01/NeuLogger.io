import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../Base";
import backgroundImage from "./background_image.jpg";

const Signup = () => {
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
          <Row className="mt-4 mb-4">
            <Col sm={{ size: 6, offset: 3 }}>
              <Card color="dark" outline>
                <CardHeader>
                  <h4>Fill Information for Registration !!</h4>
                </CardHeader>
                <CardBody>
                  <Form>
                    {/* Name field */}
                    <FormGroup>
                      <Label for="name">Enter your Name</Label>
                      <Input type="text" placeholder="Enter here" id="name" />
                    </FormGroup>
                    {/* Email field */}
                    <FormGroup>
                      <Label for="email">Enter your Email</Label>
                      <Input type="email" placeholder="Enter here" id="email" />
                    </FormGroup>
                    {/* Password field */}
                    <FormGroup>
                      <Label for="password">Enter your Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter here"
                        id="password"
                      />
                    </FormGroup>
                    {/* Text area about field */}
                    <FormGroup>
                      <Label for="about">Enter your About</Label>
                      <Input
                        type="textarea"
                        placeholder="Enter here"
                        id="about"
                        style={{ height: "200px" }}
                      />
                    </FormGroup>
                    <Container className="text-center">
                      <Button outline color="dark">
                        Register
                      </Button>
                      <Button
                        outline
                        color="secondary"
                        type="reset"
                        className="ms-2"
                      >
                        Reset
                      </Button>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
};

export default Signup;
