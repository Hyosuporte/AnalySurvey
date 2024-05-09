/* eslint-disable no-unused-vars */
import axios from "./axios";

export const register = (user) => axios.post(`/register/`, user);

export const login = (user) => axios.post(`/login/`, user);

export const verify = (token) =>
  axios.get(`/verify/`, {
    headers: { Authorization: `Token ${token}` },
  });

export const activeCount = (data) => axios.post(`/users/active/`, data);
