import { useEffect } from "react";
import { useForms } from "../context/FormsContext";
import { useParams } from "react-router-dom";

export function FormsResponder() {
  const { form, getForm } = useForms();
  const { id } = useParams();

  useEffect(() => {
    getForm(id);
  }, []);
  return (
    <div>
      <h1>Hola soy el formulario respuesta </h1>
      <p style={{ color: "black" }} >{JSON.stringify(form)}</p>
    </div>
  );
}
