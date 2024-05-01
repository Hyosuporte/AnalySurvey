import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
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
      <div className="container-titulo-quest">
        <h4 htmlFor="question-text">
          {" "}
          <ViewHeadlineIcon sx={{ color: "#865dff" }} fontSize="medium" />{" "}
          {question.orden}
        </h4>
        <TextField
          type="text"
          defaultValue={question.titulo}
          label="Texto de la pregunta"
          variant="standard"
          color="secondary"
          autoComplete="off"
          className="question-input"
          onChange={(e) => handleChangeQuestion(e.target.value)}
          onBlur={() => handleBlurTitle(question.id)}
        />
      </div>
      <div className="container-options-quest">
        <TextField
          disabled
          type="text"
          variant="standard"
          color="secondary"
          placeholder="Texto de la respuesta"
          className="option-disable"
        />
      </div>
    </Box>
  );
}
