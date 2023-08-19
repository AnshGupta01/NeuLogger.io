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
import backgroundImage from "../../background_image.jpg";
import Base from "../Parts/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../Services/user_service";
import { doLogin } from "../../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  //Handle change function
  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetails({
      ...loginDetails,
      [field]: actualValue,
    });
  };

  //reset handler
  const handleReset = () => {
    setLoginDetails({
      username: "",
      password: "",
    });
  };

  //Handle form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetails);
    //validation
    if (
      loginDetails.username.trim() === "" ||
      loginDetails.password.trim() === ""
    ) {
      toast.error("Email or Password is blank");
      return;
    }

    //Submitting data to server to get JWT Token
    loginUser(loginDetails)
      .then((Data) => {
        console.log("user login");
        console.log(Data);

        //save data to local storage
        doLogin(Data, () => {
          console.log("Login detail is saved to local storage");
          //redirect to user dashboard page
          navigate("/user/dashboard");
        });

        toast.success("Successfully logged in");
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.status === 400 || err.response.status === 404) {
          toast.error(err.response.data.message);
        }
        toast.error("Something Went Wrong on Server");
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
                  <h4>Please Enter Login Information</h4>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleFormSubmit}>
                    {/* Email field */}
                    <FormGroup>
                      <Label for="email">Enter your Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter here"
                        id="email"
                        value={loginDetails.username}
                        onChange={(e) => handleChange(e, "username")}
                      />
                    </FormGroup>
                    {/* Password field */}
                    <FormGroup>
                      <Label for="password">Enter your Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter here"
                        id="password"
                        value={loginDetails.password}
                        onChange={(e) => handleChange(e, "password")}
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
                        onClick={handleReset}
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
