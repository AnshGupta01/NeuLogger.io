import React, { useContext } from "react";
import Base from "./Base";
import userContext from "../context/userContext"

const ProfileInfo = () => {

  const user = useContext(userContext)

  return (
    <Base>
      <div>
        <h1>Profile info</h1>
        <h3>Welcome: {user.name}</h3>
      </div>
    </Base>
  );
};

export default ProfileInfo;
