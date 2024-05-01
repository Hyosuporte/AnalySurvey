import { useForms } from "../../context/FormsContext";
import TextField from "@mui/material/TextField";
import StarIcon from "@mui/icons-material/Star";
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
      <div className="container-titulo-quest">
        <h4 htmlFor="question-text">
          <StarIcon sx={{ color: "#865dff" }} fontSize="medium" />{" "}
          {question.orden}
        </h4>
        <TextField
          type="text"
          defaultValue={question.titulo}
          label="Calificacion"
          variant="standard"
          color="secondary"
          autoComplete="off"
          className="question-input"
          onChange={(e) => handleChangeQuestion(e.target.value)}
          onBlur={() => handleBlurTitle(question.id)}
        />
      </div>
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ width: "84%", margin: "auto" }}
      >
        <Grid item sx={{ marginRight: "1rem" }}>
          <h6>1 a</h6>{" "}
        </Grid>
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
    </Box>
  );
}
