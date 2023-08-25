import React from "react";
import Base from "./Base";
import AddPost from "../Pages/AddPost";
import { Container } from "reactstrap";

const Userdashboard = () => {
  return (
    <Base>
      <Container>
        <AddPost></AddPost>
      </Container>
    </Base>
  );
};

export default Userdashboard;
