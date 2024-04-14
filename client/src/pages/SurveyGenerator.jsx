/* eslint-disable react-hooks/exhaustive-deps */
import { NavbarForm } from "../components/form/NavbarForm";
import { FormEdit } from "../components/form/FormEdit";
import { ListP } from "../components/form/ListCampo";
import { useForms } from "../context/FormsContext";
import { Loading } from "../components/Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

export function SurveyGenerator() {
  const { id } = useParams();
  const { form, getForm } = useForms();
  const [loading, setLoading] = useState(true);
  // FIXME: Proteger ruta solo para el creador de la encuesta
  useEffect(() => {
    getForm(id).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;
  {
    /* FIXME: Poner una alerta a la hora de eliminar una opcion de una pregunta o cambiar su titulo */
  }
  return (
    <main className="crear-form">
      <NavbarForm title={form.titulo} formId={form.id} />
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        flexWrap={"wrap"}
        height="auto"
      >
        <Grid item xs={12} md={3}>
          <ListP data={form.campos} formId={form.id} />
        </Grid>
        {/* FIXME: arreglar los styles del form editar */}
        <Grid item style={{ flex: 1 }}>
          <FormEdit data={form.campos} />
        </Grid>
      </Grid>
    </main>
  );
}
