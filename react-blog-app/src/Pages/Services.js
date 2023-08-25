import { useContext } from "react";
import Base from "../Components/Base";
import userContext from "../context/userContext";

const Services = () => {
  const user = useContext(userContext);
  return (
    <Base>
      <h1>This is services page</h1>
      <h3>Welcome: {user.name} </h3>
    </Base>
  );
};

export default Services;
