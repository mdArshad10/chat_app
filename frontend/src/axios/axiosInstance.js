import axios from "axios";
import { BACKEND_URL } from "../constant";

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies for cross-origin requests
});

const noHeaderEndpoint = ["/users/signup", "/users/login"];
const fileUploadEndpoint = ["/users/signup"];

const isPublicEndpoint = (url) => {
  return noHeaderEndpoint.some((endpoint) => url.includes(endpoint));
};

const isFileUploadEndpoint = (url) => {
  return fileUploadEndpoint.some((endpoint) => url.includes(endpoint));
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (isFileUploadEndpoint(config.ur)) {
      config.headers = {
        ...config.headers,
        "Content-Type": "multipart/form-data",
      };
      return config;
    }

    if (isPublicEndpoint(config.url)) {
      return config;
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
