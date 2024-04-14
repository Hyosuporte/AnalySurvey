import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Box from "@mui/material/Box";

export function TextAsnw({ question, setRespuestas }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setRespuestas((prevRespuestas) => [
      ...prevRespuestas.filter(
        (respuesta) => respuesta.campoFormulario !== question.id
      ),
      {
        campoFormulario: question.id,
        valor: value,
      },
    ]);
  };

  return (
    <Box component="div" className="container-asnwer">
      <Typography variant="h6"> {question.titulo} </Typography>
      <TextField
        type="text"
        fullWidth
        color="secondary"
        autoComplete="off"
        onChange={handleChange}
        value={selectedOption}
      />
    </Box>
  );
}
