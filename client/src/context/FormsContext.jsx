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
  createExcelReq,
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
  const [isLoading, setIsloading] = useState(true);
  const [analitys, setAnalitys] = useState([]);
  const [campos, setCampos] = useState([]);
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState(null);

  const navigate = useNavigate();

  const getForms = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await getFormsUser(token);
      setForms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getForm = async (id) => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await getFormResponder(id, token);
      setForm(res.data);
      setCampos(res.data.campos);
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteForm = async (id) => {
    try {
      const token = window.localStorage.getItem("token");
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
      const token = window.localStorage.getItem("token");
      const res = await duplicateFormReq(id, token);
      if (res.status === 201) {
        setForms([...forms, res.data]);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateForm = async (id, title) => {
    try {
      const token = window.localStorage.getItem("token");
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
      const token = window.localStorage.getItem("token");
      // eslint-disable-next-line no-unused-vars
      const res = await createFormReq(token).then((response) => {
        navigate(`/survey/create/${response.data.id}`);
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
    const token = window.localStorage.getItem("token");
    const res = await createCampoReq(formId, token, data);
    return res.data;
  };

  const updateCampo = async (id, data) => {
    const token = window.localStorage.getItem("token");
    const res = await updateCampoReq(id, token, data);
    res.status == 200 ? true : false;
  };

  const updateCampos = (newCampos) => {
    setCampos([...campos, newCampos]);
    console.log(campos);
  };

  const createOption = async (id, data) => {
    try {
      const token = window.localStorage.getItem("token");
      // eslint-disable-next-line no-unused-vars
      const res = await createOptionReq(token, id, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOption = async (id) => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await deleteOptionReq(id, token);
      return res.status == 204 ? true : false;
    } catch (error) {
      console.log(error);
    }
  };

  const updateOpcion = async (data) => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await updateOpcionReq(token, data);
      return res.status == 200 ? true : false;
    } catch (error) {
      console.log(error);
    }
  };

  const saveAsk = async (data) => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await saveAskReq(token, data);
      return res.status == 201 ? true : false;
    } catch (error) {
      console.log(error);
    }
  };

  const charts = async (id) => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await chartsAnalitys(token, id);
      setAnalitys(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createExcel = async (id) => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await createExcelReq(token, id);
      if (res.status === 200 && res.data) {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        console.log(res.data);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `respuestas_formulario.xlsx`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } else {
        console.log("Error al descargar el archivo");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <FormContext.Provider
      value={{
        isLoading,
        forms,
        campos,
        getForms,
        form,
        getForm,
        deleteForm,
        duplicateForm,
        updateForm,
        createForm,
        createCampo,
        updateCampo,
        updateCampos,
        createOption,
        deleteOption,
        updateOpcion,
        saveAsk,
        charts,
        analitys,
        createExcel,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
