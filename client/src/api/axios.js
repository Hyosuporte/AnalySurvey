import axios from "axios";

const API = "http://localhost:8000/api/v1";

const instance = axios.create({
  baseURL: API,
});

export default instance;
