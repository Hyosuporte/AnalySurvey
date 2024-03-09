/* eslint-disable react-hooks/exhaustive-deps */
import { useForms } from "../context/FormsContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export function CreateForm() {
  const { id } = useParams();
  const { form, getForm } = useForms();
  // FIXME: Proteger ruta solo para el creador de la encuesta
  useEffect(() => {
    getForm(id);
  }, []);

  return (
    <main className="crear-form" >
      <h3>{JSON.stringify(form)}</h3>
    </main>
  );
}
