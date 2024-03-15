import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import { useState } from "react";

export function MultipleAsnw({ question }) {
  const [opciones] = useState(question.opciones);
  return (
    <Box component="div">
      <Typography variant="p"> {question.titulo} </Typography>
      <FormControl>
        <RadioGroup name="radio-buttons-group">
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
