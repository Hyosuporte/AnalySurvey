import { createContext, useContext, useState } from "react";
import {
  getFormsUser,
  getFormResponder,
  deleteFormReq,
  duplicateFormReq,
  updateFormReq,
  createFormReq,
  createOptionReq,
  deleteOptionReq,
  updateOpcionReq,
  updateCampoReq,
  createCampoReq,
  saveAskReq,
  chartsAnalitys,
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
  const [analitys, setAnalitys] = useState([]);
  const [form, setForm] = useState(null);
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
      if (res.status === 204) {
        setForms(forms.filter((form) => form.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const duplicateForm = async (id) => {
    try {
      const res = await duplicateFormReq(id, token);
      if (res.status === 201) {
        setForms([...forms, res.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateForm = async (id, title) => {
    try {
      const res = await updateFormReq(id, token, title);
      if (res.status === 200) {
        location.reload();
        return true;
      }
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

  const createCampo = async (tipo, formId, orden) => {
    const data = {
      titulo: "Nueva Pregunta",
      requerido: 1,
      deshabilitado: 0,
      orden: orden + 1,
      tipoPregunta: tipo,
    };
    const res = await createCampoReq(formId, token, data);
    res.status == 201 ? true : false;
  };

  const updateCampo = async (id, data) => {
    const res = await updateCampoReq(id, token, data);
    res.status == 200 ? true : false;
  };

  const createOption = async (id, data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await createOptionReq(token, id, data);
      return res.status == 201 ? true : false;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOption = async (id) => {
    try {
      const res = await deleteOptionReq(id, token);
      return res.status == 204 ? true : false;
    } catch (error) {
      console.log(error);
    }
  };

  const updateOpcion = async (data) => {
    try {
      const res = await updateOpcionReq(token, data);
      return res.status == 200 ? true : false;
    } catch (error) {
      console.log(error);
    }
  };

  const saveAsk = async (data) => {
    try {
      const res = await saveAskReq(token, data);
      return res.status == 201 ? true : false;
    } catch (error) {
      console.log(error);
    }
  };

  const charts = async (id) => {
    try {
      const res = await chartsAnalitys(token, id);
      setAnalitys(res.data);
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
        createCampo,
        updateCampo,
        createOption,
        deleteOption,
        updateOpcion,
        saveAsk,
        charts,
        analitys,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
