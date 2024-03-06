import axios from "./axios";

export const getFormsUser = (token) =>
  axios.get(`/users/forms/`, {
    headers: { Authorization: `Token ${token}` },
  });
