import { useForms } from "../../context/FormsContext";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";

export function TextOption({ question }) {
  const [title, setTitle] = useState(question.titulo);
  const { updateCampo } = useForms();

  const handleChangeQuestion = (value) => {
    setTitle(value);
  };

  const handleBlurTitle = (id) => {
    question.titulo = title;
    updateCampo(id, question);
  };

  return (
    <Box className="container-campo" id={question.id}>
      <h5 htmlFor="question-text">Pregunta:</h5>
      <TextField
        type="text"
        defaultValue={question.titulo}
        fullWidth
        color="secondary"
        autoComplete="off"
        onChange={(e) => handleChangeQuestion(e.target.value)}
        onBlur={() => handleBlurTitle(question.id)}
      />
      <TextField
        disabled
        type="text"
        placeholder="Texto de la respuesta"
        fullWidth
      />
    </Box>
  );
}
