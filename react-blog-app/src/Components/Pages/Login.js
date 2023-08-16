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
import backgroundImage from "./background_image.jpg";
import Base from "../Base";

const Login = () => {
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
                  <h4>Please Enter Login Information</h4>
                </CardHeader>
                <CardBody>
                  <Form>
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
                    <Container className="text-center">
                      <Button outline color="dark">
                        Login
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

export default Login;
