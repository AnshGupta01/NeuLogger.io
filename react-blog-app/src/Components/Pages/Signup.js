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
import { useState } from "react";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(data);
  //   }
  // }, [formErrors]);

  //Form data validation function
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required!!";
    }
    if (!values.email) {
      errors.email = "Email is required!!";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required!!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be atleast 4 characters long";
    } else if (values.password.length > 10) {
      errors.password = "Password canno be more than 10 characters";
    }
    if (!values.about) {
      errors.about = "About is required";
    }
    return errors;
  };

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
    //Validating the form
    setformErrors(validate(data));
    setIsSubmit(true);
    console.log(data);

    //Calling server API for sending the data
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
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="alert alert-success mt-4">
              Signed in successfully
            </div>
          ) : (
            <div className="alert alert-danger mt-4">Error in signing in</div>
          )}
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
                      />
                      <p style={{ color: "red" }}>{formErrors.name}</p>
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
                      />
                      <p style={{ color: "red" }}>{formErrors.email}</p>
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
                      />
                      <p style={{ color: "red" }}>{formErrors.password}</p>
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
                      />
                      <p style={{ color: "red" }}>{formErrors.about}</p>
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
