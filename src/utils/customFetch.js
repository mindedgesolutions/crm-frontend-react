import axios from "axios";
import showError from "./showError";

const customFetch = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

customFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
      showError("Session expired. Please sign in again.");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

export default customFetch;
