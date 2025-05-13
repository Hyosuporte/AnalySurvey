import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default instance;
