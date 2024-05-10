/* eslint-disable no-unused-vars */
import axios from "./axios";

export const register = (user) => axios.post(`/register/`, user);

export const login = (user, hCaptchaToken) =>
  axios.post(`/login/`, { ...user, hCaptchaToken });

export const verify = (token) =>
  axios.get(`/verify/`, {
    headers: { Authorization: `Token ${token}` },
  });

export const activeCount = (data) => axios.post(`/users/active/`, data);
