import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.localStorage.removeItem("token");
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
