import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://ecommerce-fullstack-app-3ge9.onrender.com/",
  headers: {
    accept: "application/json",
  },
});

// Added a request interceptor to dynamically set the Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token") || Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
