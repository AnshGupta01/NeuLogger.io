import React, { useEffect } from "react";
import userContext from "./userContext";
import { useState } from "react";
import { getCurrentUser, isLoggedIn } from "../auth";

function UserProvider({ children }) {
  const [user, setUser] = useState({
    data: {},
    login: false,
  });

  useEffect(() => {
    setUser({
      data: getCurrentUser(),
      login: isLoggedIn(),
    });
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
