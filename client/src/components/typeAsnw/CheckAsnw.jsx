import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

export function CheckAsnw({ question, setRespuestas }) {
  const [opciones] = useState(question.opciones);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setSelectedOptions((prevOptions) => {
      if (isChecked) {
        return [...prevOptions, value];
      } else {
        return prevOptions.filter((option) => option !== value);
      }
    });
  };

  const updateRespuestas = (selectedOptions) => {
    const selectedString = selectedOptions.join(", ");
    setRespuestas((prevRespuestas) => {
      const filteredRespuestas = prevRespuestas.filter(
        (respuesta) => respuesta.campoFormulario !== question.id
      );
      return [
        ...filteredRespuestas,
        {
          campoFormulario: question.id,
          valor: selectedString,
        },
      ];
    });
  };

  useEffect(() => {
    updateRespuestas(selectedOptions);
  }, [selectedOptions]);

  return (
    <Box component="div">
      <FormGroup>
        <Typography variant="p"> {question.titulo} </Typography>
        {opciones.map((item, index) => (
          <FormControlLabel
            key={index}
            label={item.valor}
            control={<Checkbox value={item.valor} />}
            onChange={handleOptionChange}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
