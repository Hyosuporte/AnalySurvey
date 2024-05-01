import axios from "axios";

const API = "https://analysurvey.onrender.com/api/v1";

const instance = axios.create({
  baseURL: API,
});

export default instance;
