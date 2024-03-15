import { MultipleAsnw } from "../components/typeAsnw/MultipleAsnw";
import { CheckAsnw } from "../components/typeAsnw/CheckAsnw";
import { RatinAsnw } from "../components/typeAsnw/RatinAsnw";
import { TextAsnw } from "../components/typeAsnw/TextAsnw";
import { useForms } from "../context/FormsContext";
import { Loading } from "../components/Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

export function FormsResponder() {
  const { form, getForm } = useForms();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getForm(id).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
//FIXME: Poner el FormControl a cada pregunta y mejorar los styles
  return (
    <main>
      <Box className="form-response" component="form">
        {form.campos.map((item, i) => {
          switch (item.tipoPregunta_id) {
            case 1:
              return <MultipleAsnw key={i} question={item} />;
            case 2:
              return <TextAsnw key={i} question={item} />;
            case 3:
              return <CheckAsnw key={i} question={item} />;
            case 4:
              return <RatinAsnw key={i} question={item} />;
          }
        })}
      </Box>
    </main>
  );
}
