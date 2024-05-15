/* eslint-disable react-hooks/exhaustive-deps */
import { NavbarForm } from "../components/form/NavbarForm";
import { FormEdit } from "../components/form/FormEdit";
import { ListP } from "../components/form/ListCampo";
import { useForms } from "../context/FormsContext";
import { Loading } from "../components/Loading";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";

export default function SurveyGenerator() {
  const { id } = useParams();
  const { form, campos, getForm, updateCampos, isLoading } = useForms();

  // FIXME: Proteger ruta solo para el creador de la encuesta
  useEffect(() => {
    getForm(id);
  }, []);

  if (isLoading) return <Loading />;

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
        <Grid item xs={10} md={2.5} >
          <ListP data={campos} formId={form.id} addCampo={updateCampos} />
        </Grid>
        {/* FIXME: arreglar los styles del form editar */}
        <Grid item style={{ flex: 1 }}>
          <FormEdit data={campos} />
        </Grid>
      </Grid>
    </main>
  );
}
