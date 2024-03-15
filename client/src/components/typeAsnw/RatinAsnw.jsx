import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

export function RatinAsnw({ question }) {
  return (
    <Box component="div">
      <Typography variant="p"> {question.titulo} </Typography>
      <Rating max={parseInt(question.opciones[0].valor)} />
    </Box>
  );
}
