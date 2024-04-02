import { useForms } from "../../context/FormsContext";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";

export function RatinOptino({ question }) {
  const [title, setTitle] = useState(question.titulo);
  const [valueOption, setValueOption] = useState(
    question.opciones[0] == undefined ? 0 : question.opciones[0].valor
  );
  const { updateCampo, updateOpcion } = useForms();

  const handleChangeQuestion = (value) => {
    setTitle(value);
  };

  const handleChangeValue = (value) => {
    question.opciones[0].titulo = value;
    question.opciones[0].valor = value;
    if (updateOpcion(question.opciones[0])) {
      setValueOption(value);
    }
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
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item>1 a </Grid>
        <Grid item>
          <Select
            size="small"
            value={valueOption}
            onChange={(e) => handleChangeValue(e.target.value)}
          >
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
}
