import React from "react";
import Base from "../../Parts/Base";
import AddPost from "../AddPost";
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
