import axios from "./axios";

export const getFormsUser = (token) =>
  axios.get(`/users/forms/`, {
    headers: { Authorization: `Token ${token}` },
  });

export const getFormResponder = (id, token) =>
  axios.get(`/forms/${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });

export const deleteFormReq = (id, token) =>
  axios.delete(`/forms/${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });

export const duplicateFormReq = (id, token) =>
  axios.post(
    `/forms/${id}/duplicate/`,
    {},
    {
      headers: { Authorization: `Token ${token}` },
    }
  );

export const updateFormReq = (id, token, data) =>
  axios.patch(`/forms/${id}/update/title/`, data, {
    headers: { Authorization: `Token ${token}` },
  });

export const createFormReq = (token, data) =>
  axios.post(`/forms/create/`, data, {
    headers: { Authorization: `Token ${token}` },
  });

export const createCampoReq = (id, token, data) =>
  axios.post(`/forms/create_campo/${id}/`, data, {
    headers: { Authorization: `Token ${token}` },
  });

export const updateCampoReq = (id, token, data) =>
  axios.patch(`/forms/${id}/update/campo/`, data, {
    headers: { Authorization: `Token ${token}` },
  });

export const createOptionReq = (token, id, data) =>
  axios.post(`/forms/create_option/${id}/`, data, {
    headers: { Authorization: `Token ${token}` },
  });

export const deleteOptionReq = (id, token) =>
  axios.delete(`forms/delete/option/${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });

export const updateOpcionReq = (token, data) =>
  axios.patch(`/forms/${data.id}/update/option/`, data, {
    headers: { Authorization: `Token ${token}` },
  });

export const saveAskReq = (token, data) =>
  axios.post(`/forms/ask/`, data, {
    headers: { Authorization: `Token ${token}` },
  });

export const chartsAnalitys = (token, id) =>
  axios.get(`/forms/${id}/charts/`, {
    headers: { Authorization: `Token ${token}` },
  });

export const createExcelReq = (token, id) =>
  axios.get(`/forms/${id}/excel/`, {
    headers: { Authorization: `Token ${token}` },
    responseType: "blob",
  });
