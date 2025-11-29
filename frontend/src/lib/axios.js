import axios from "axios";

const getDevBaseURL = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  if (typeof window !== "undefined") {
    const { protocol, hostname } = window.location;
    const port = import.meta.env.VITE_API_PORT || 5001;
    return `${protocol}//${hostname}:${port}/api`;
  }

  return "http://localhost:5001/api";
};

const baseURL = import.meta.env.MODE === "development" ? getDevBaseURL() : "/api";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
