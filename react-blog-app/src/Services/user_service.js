import { myAxios } from "./helper_service";

export const signUp = (user) => {
  return myAxios.post("/auth/register", user).then((response) => response.data);
};

export const loginUser = (loginDetails) => {
  return myAxios.post("/auth/login", loginDetails).then((resp) => resp.data);
};
