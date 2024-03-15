import { useForms } from "../context/FormsContext";
import { Loading } from "../components/Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import { MultipleOption } from "../components/typeAsk/MultipleOption";
import { TextOption } from "../components/typeAsk/TextOption";
import { CheckOption } from "../components/typeAsk/CheckOption";
import { RatinOptino } from "../components/typeAsk/RatinOption";

export function FormsResponder() {
  const { form, getForm } = useForms();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getForm(id).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <main>
      <Box className="form-response" component="form">
        {form.campos.map((item, i) => {
          switch (item.tipoPregunta_id) {
            case 1:
              return <MultipleOption key={i} question={item} />;
            case 2:
              return <TextOption key={i} question={item} />;
            case 3:
              return <CheckOption key={i} question={item} />;
            case 4:
              return <RatinOptino key={i} question={item} />;
            case 5:
              return <h1>Tipo 5</h1>;
          }
        })}
      </Box>
    </main>
  );
}
