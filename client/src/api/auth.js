/* eslint-disable no-unused-vars */
import axios from "axios";

const API = "http://localhost:8000/api/v1";

export const register = (user) => axios.post(`${API}/register`);

export const login = (user) => axios.post(`${API}/login`, user);
