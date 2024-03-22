/* eslint-disable react-hooks/exhaustive-deps */
import { NavbarForm } from "../components/form/NavbarForm"; 
import { FormEdit } from "../components/form/FormEdit";
import { ListP } from "../components/form/ListCampo";
import { useForms } from "../context/FormsContext";
import { Loading } from "../components/Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

export function CreateForm() {
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

  return (
    <main id="crear-form">
      <NavbarForm title={form.titulo} formId={form.id} />
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        flexWrap={"nowrap"}
        height="100vh"
      >
        <Grid item>
          <ListP data={form.campos} formId={form.id} />
        </Grid>
        {/* FIXME: arreglar los styles del form editar */}
        <Grid item style={{ flex: 1, overflow: "auto" }}>
          <FormEdit data={form.campos} />
        </Grid>
      </Grid>
    </main>
  );
}
