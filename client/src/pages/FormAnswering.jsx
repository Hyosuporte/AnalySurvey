import { MultipleAsnw } from "../components/typeAsnw/MultipleAsnw";
import { CheckAsnw } from "../components/typeAsnw/CheckAsnw";
import { RatinAsnw } from "../components/typeAsnw/RatinAsnw";
import { TextAsnw } from "../components/typeAsnw/TextAsnw";
import { useForms } from "../context/FormsContext";
import { Loading } from "../components/Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export function FormAnswering() {
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
  const [respuestas, setRespuestas] = useState([]);
  const { form, getForm, saveAsk } = useForms();
  const { id } = useParams();

  useEffect(() => {
    getForm(id)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching form:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  const onSubmit = () => {
    const jsonData = {
      respuestas: respuestas.map((respuesta) => ({
        campoFormulario: respuesta.campoFormulario,
        valor: respuesta.valor,
      })),
    };
    saveAsk(jsonData);
  };

  //FIXME: Poner el FormControl a cada pregunta y mejorar los styles
  return (
    <main className="form-answering">
      <h3> {form.titulo} </h3>
      <Box
        className="form-response"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {form.campos.map((item, i) => {
          switch (item.tipoPregunta) {
            case 1:
              return (
                <MultipleAsnw
                  key={i}
                  question={item}
                  setRespuestas={setRespuestas}
                />
              );
            case 2:
              return (
                <TextAsnw
                  key={i}
                  question={item}
                  setRespuestas={setRespuestas}
                />
              );
            case 3:
              return (
                <CheckAsnw
                  key={i}
                  question={item}
                  setRespuestas={setRespuestas}
                />
              );

            case 4:
              return (
                <RatinAsnw
                  key={i}
                  question={item}
                  setRespuestas={setRespuestas}
                />
              );
            default:
              return null;
          }
        })}
        <Button type="submit"> Enviar </Button>
      </Box>
    </main>
  );
}
