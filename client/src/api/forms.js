import axios from "./axios";

export const getFormsUser = (token) =>
  axios.get(`/users/forms/`, {
    headers: { Authorization: `Token ${token}` },
  });

export const getFormResponder = (id, token) =>
  axios.get(`/forms/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });

export const deleteFormReq = (id, token) =>
  axios.delete(`/forms/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });

export const duplicateFormReq = (id, token) =>
  axios.post(
    `/forms/${id}/duplicate`,
    {},
    {
      headers: { Authorization: `Token ${token}` },
    }
  );

export const updateFormReq = (id, token, data) =>
  axios.patch(`/forms/${id}/update`, data, {
    headers: { Authorization: `Token ${token}` },
  });

export const createFormReq = (token, data) =>
  axios.post(`/forms/create`, data, {
    headers: { Authorization: `Token ${token}` },
  });
