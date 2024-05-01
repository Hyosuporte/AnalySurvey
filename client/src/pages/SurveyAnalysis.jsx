/* eslint-disable react-hooks/exhaustive-deps */
import { NavbarForm } from "../components/form/NavbarForm";
import { useForms } from "../context/FormsContext";
import { Loading } from "../components/Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ListAnalitys } from "../components/analitys/ListAnalitys";

export function SurveyAnalysis() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { form, getForm } = useForms();

  useEffect(() => {
    getForm(id).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="container-analytis">
      <NavbarForm formId={form.id} />
      <ListAnalitys />
    </main>
  );
}
