import { ActionTypes } from "../Constants/actionTypes";

export const login = (userDetails) => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("user", JSON.stringify(userDetails));
  return {
    type: ActionTypes.LOGIN,
    payload: userDetails,
  };
};

export const logout = () => {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("user");
  return {
    type: "LOGOUT",
  };
};
