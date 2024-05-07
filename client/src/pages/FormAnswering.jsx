import { MultipleAsnw } from "../components/typeAsnw/MultipleAsnw";
import { CheckAsnw } from "../components/typeAsnw/CheckAsnw";
import { RatinAsnw } from "../components/typeAsnw/RatinAsnw";
import { TextAsnw } from "../components/typeAsnw/TextAsnw";
import { useForms } from "../context/FormsContext";
import { Loading } from "../components/Loading";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function FormAnswering() {
  const { register, handleSubmit } = useForm();
  const [respuestas, setRespuestas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(true);
  const navigate = useNavigate();
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
  if (!answer)
    return <Box sx={{ background: "red" }}>Ya respondio la encuesta</Box>;

  const onSubmit = () => {
    const jsonData = {
      respuestas: respuestas.map((respuesta) => {
        if (!respuesta.valor) {
          null;
        }
        return {
          campoFormulario: respuesta.campoFormulario,
          valor: respuesta.valor,
        };
      }),
    };

    const allResponsesFilled = jsonData.respuestas.every(
      (respuesta) => respuesta.valor
    );

    if (allResponsesFilled) {
      setLoading(true);
      saveAsk(jsonData).then(() => {
        alert("Respuestas guardadas");
        navigate("/");
      });
    } else {
      alert("Por favor, llena todas las respuestas antes de enviar");
    }
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
                  register={register}
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
        <Button type="submit" className="button" disabled={loading}>
          Enviar
        </Button>
      </Box>
    </main>
  );
}
