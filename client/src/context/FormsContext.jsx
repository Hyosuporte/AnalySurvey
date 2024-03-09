import { createContext, useContext, useState } from "react";
import {
  getFormsUser,
  getFormResponder,
  deleteFormReq,
  duplicateFormReq,
  updateFormReq,
  createFormReq,
} from "../api/forms";

import { useNavigate } from "react-router-dom";

const FormContext = createContext();

export const useForms = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

export function FormProvider({ children }) {
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState([]);
  const navigate = useNavigate();

  const token = window.localStorage.getItem("token");

  const getForms = async () => {
    try {
      const res = await getFormsUser(token);
      setForms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getForm = async (id) => {
    try {
      const res = await getFormResponder(id, token);
      setForm(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteForm = async (id) => {
    try {
      const res = await deleteFormReq(id, token);
      if (res.status == 204) setForms(forms.filter(() => forms.id != id));
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const duplicateForm = async (id) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await duplicateFormReq(id, token).then((response) => {
        console.log(response.data);
        location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateForm = async (id, title) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await updateFormReq(id, token, title).then((response) => {
        console.log(response.data);
        location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createForm = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await createFormReq(token).then((response) => {
        navigate(`/profile/${response.data.id}/create-form`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContext.Provider
      value={{
        forms,
        getForms,
        form,
        getForm,
        deleteForm,
        duplicateForm,
        updateForm,
        createForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}