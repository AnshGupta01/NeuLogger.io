import { useContext } from "react";
import Base from "../Components/Base";
import userContext from "../context/userContext";

const Services = () => {
  const object = useContext(userContext);
  return (
    <Base>
      <h1>This is services page (Demo page)</h1>
      <h3>Welcome: {object.user.login && object.user.data.name} </h3>
    </Base>
  );
};

export default Services;
