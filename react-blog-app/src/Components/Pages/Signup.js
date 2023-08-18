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
  FormFeedback,
} from "reactstrap";
import Base from "../Base";
import backgroundImage from "./background_image.jpg";
import { useState } from "react";
import { signUp } from "../../Services/user_service";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  //Handle change function
  const handleChange = (event, property) => {
    //Setting values dynamically
    setData({ ...data, [property]: event.target.value });
  };

  //Resetting the form
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  //Submitting the form
  const submitForm = (event) => {
    event.preventDefault();

    console.log(data);

    //Calling server API for sending the data
    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("Sucessfully logged");
        toast.success("Sucessfully registered");
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
        setError({
          errors: {},
          isError: false,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Error logged");
        //Handle errors here
        setError({
          errors: err,
          isError: true,
        });
      });
  };

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
                  <Form onSubmit={submitForm}>
                    {/* Name field */}
                    <FormGroup>
                      <Label for="name">Enter your Name</Label>
                      <Input
                        type="text"
                        placeholder="Enter here"
                        id="name"
                        onChange={(e) => handleChange(e, "name")}
                        value={data.name}
                        invalid={
                          error.errors?.response?.data?.name ? true : false
                        }
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.name}
                      </FormFeedback>
                    </FormGroup>
                    {/* Email field */}
                    <FormGroup>
                      <Label for="email">Enter your Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter here"
                        id="email"
                        onChange={(e) => handleChange(e, "email")}
                        value={data.email}
                        invalid={
                          error.errors?.response?.data?.email ? true : false
                        }
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.email}
                      </FormFeedback>
                    </FormGroup>
                    {/* Password field */}
                    <FormGroup>
                      <Label for="password">Enter your Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter here"
                        id="password"
                        onChange={(e) => handleChange(e, "password")}
                        value={data.password}
                        invalid={
                          error.errors?.response?.data?.password ? true : false
                        }
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.password}
                      </FormFeedback>
                    </FormGroup>
                    {/* Text area about field */}
                    <FormGroup>
                      <Label for="about">Enter your About</Label>
                      <Input
                        type="textarea"
                        placeholder="Enter here"
                        id="about"
                        style={{ height: "200px" }}
                        onChange={(e) => handleChange(e, "about")}
                        value={data.about}
                        invalid={
                          error.errors?.response?.data?.about ? true : false
                        }
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.about}
                      </FormFeedback>
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
                        onClick={resetData}
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
