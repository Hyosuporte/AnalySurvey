import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { useState } from "react";

export function CheckAsnw({ question }) {
  const [opciones] = useState(question.opciones);
  return (
    <Box component="div" >
      <FormGroup>
        <Typography variant="p"> {question.titulo} </Typography>
        {opciones.map((item, index) => (
          <FormControlLabel
            key={index}
            label={item.valor}
            control={<Checkbox />}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
