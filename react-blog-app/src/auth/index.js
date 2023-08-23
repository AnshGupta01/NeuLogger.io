//To check if the user is logged in
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data == null) return false;
  else return true;
};

// Do logging in: set to local storage
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// Do logging out: remove from local Storage
export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

//Get current user
export const getCurrentUser = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).user;
  } else return undefined;
};

export const getToken = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).token;
  } else {
    return null;
  }
};
