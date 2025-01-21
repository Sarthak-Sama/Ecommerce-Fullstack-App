import axios from "../../utils/axios";
import { setCredentials, logout } from "../reducers/userSlice";

// Action Creator
export const fetchUser = () => async (dispatch) => {
  try {
    // Send the token to the backend for verification
    const response = await axios.get("/user/profile");
    dispatch(setCredentials(response.data));
  } catch (error) {
    console.error("Error while fetching the user: ", error);
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post("/user/login", credentials);
    const { user, token } = response.data;

    localStorage.setItem("token", token);
    dispatch(setCredentials({ user, token }));
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post("/user/logout");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    dispatch(logout());
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("/user/signup", userData);
    const { user, token } = response.data;

    // Store token in localStorage
    localStorage.setItem("token", token);
    // Update redux state
    dispatch(setCredentials({ user, token }));

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Signup failed",
    };
  }
};
