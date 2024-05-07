import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

export function RatinAsnw({ question, setRespuestas }) {
  const maxRating = parseInt(question.opciones[0].valor);
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    setRespuestas((prevRespuestas) => {
      const filteredRespuestas = prevRespuestas.filter(
        (respuesta) => respuesta.campoFormulario !== question.id
      );
      return [
        ...filteredRespuestas,
        {
          campoFormulario: question.id,
          valor: ratingValue,
        },
      ];
    });
  }, []);

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
    const respuesta = {
      campoFormulario: question.id,
      valor: newValue,
    };
    setRespuestas((prevRespuestas) => {
      // Filtrar respuestas anteriores de esta pregunta
      const filteredRespuestas = prevRespuestas.filter(
        (respuesta) => respuesta.campoFormulario !== question.id
      );
      // Agregar la nueva respuesta
      return [...filteredRespuestas, respuesta];
    });
  };

  return (
    <Box component="div" className="container-asnwer">
      <Typography variant="h6"> {question.titulo} </Typography>
      <Rating
        max={maxRating}
        value={ratingValue}
        onChange={handleRatingChange}
      />
    </Box>
  );
}
