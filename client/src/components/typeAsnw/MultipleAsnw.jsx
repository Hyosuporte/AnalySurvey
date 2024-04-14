import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import { useState } from "react";

export function MultipleAsnw({ question, setRespuestas }) {
  const [opciones] = useState(question.opciones);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
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
    <Box component="div" className="container-asnwer" >
      <Typography variant="h6"> {question.titulo} </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
          {opciones.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.valor}
              control={<Radio />}
              label={option.titulo}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
