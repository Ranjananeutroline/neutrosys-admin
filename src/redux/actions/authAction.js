import axios from "axios";
import { useNavigate } from "react-router-dom";

// actions/auth.js
export const authStart = () => ({ type: "AUTH_START" });
export const authSuccess = (user) => ({ type: "AUTH_SUCCESS", payload: user });
export const authFail = (error) => ({ type: "AUTH_FAIL", payload: error });
export const logout = () => ({ type: "LOGOUT" });
export const userUpdate = (user) => ({type: "USER_UPDATE", payload:user})
// Async action using Thunk


export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(authStart());

    try {
      console.log(credentials);
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        credentials
      );
      localStorage.setItem("user", JSON.stringify(response));

      // console.log(localStorage.getItem("user"));
      // const user = await response.data.user;
      const user = await response;
      console.log("response aayo from user", user);

      dispatch(authSuccess(user));
      return response;
    } catch (error) {
      dispatch(authFail("Invalid credentials"));
      throw error;
    }
  };
};
export const signup = (credentials) => {
  return async (dispatch) => {
    dispatch(authStart());

    try {
      console.log("yesma erro");
      console.log("credentials", credentials);
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        credentials
      );
      // localStorage.setItem("user", JSON.stringify(response));

      // console.log(localStorage.getItem("user"));
      console.log("response aayo", response);
      const user = response.data.user;
      dispatch(authSuccess(user));
      return response;
    } catch (error) {
      dispatch(authFail("Invalid credentials"));
      throw error;
    }
  };
};
export const userlogout = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout"
      );
      dispatch(logout())
      localStorage.removeItem("user");
      console.log("response aayo", response);
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const userDetailsUpdate = (credentials)=>{
  return async (dispatch) =>{
    try {
      console.log(credentials);
      const response = await axios.post(
        "http://localhost:8000/api/auth/updateuserdetails",
        { credentials }
      );
      localStorage.setItem("user", JSON.stringify(response));
      dispatch(userUpdate(response))
      console.log('resssss', response);
    } catch (error) {
      throw error
    }
  }
}
