import { createContext, useContext, useState } from "react";
import { getFormsUser } from "../api/forms";

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

  const getForms = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await getFormsUser(token);
      setForms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContext.Provider value={{ forms, getForms }}>
      {children}
    </FormContext.Provider>
  );
}
