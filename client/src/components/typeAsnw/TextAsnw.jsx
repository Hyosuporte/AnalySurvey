import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export function TextAsnw({ question }) {
  return (
    <Box component="div">
      <Typography variant="p"> {question.titulo} </Typography>
      <TextField type="text" fullWidth color="secondary" autoComplete="off" />
    </Box>
  );
}
