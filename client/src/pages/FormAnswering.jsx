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

export default function FormAnswering() {
  const { handleSubmit } = useForm();
  const [respuestas, setRespuestas] = useState([]);
  const [answer, setAnswer] = useState(true);
  const { form, getForm, isLoading, saveAsk, verifyAnswerReq } = useForms();
  const { id } = useParams();

  useEffect(() => {
    verifyAnswerReq(id)
      .then((res) => {
        if (res) {
          getForm(id);
        } else {
          setAnswer(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching form:", error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading && answer) return <Loading />;
  if (!answer) return <Box sx={{ background: "red" }} >Ya respondio la encuesta</Box>;

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
        <Button type="submit" className="button">
          {/*  FIXME: Deshabilitar el button cuando mande la peticion y poner el mensaje correspondiente */}
          Enviar{" "}
        </Button>
      </Box>
    </main>
  );
}
