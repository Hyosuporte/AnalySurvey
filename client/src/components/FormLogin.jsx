import { useForm } from "react-hook-form";
import { TextField, Box, Button } from "@mui/material";

export function FormLogin() {
  const { register } = useForm();
  return (
    <Box
      component="form"
      sx={{
        width: 350,
        height: 250,
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Box sx={{ marginBottom: "2rem" }}>
        <TextField
          label="Correo"
          type="email"
          variant="outlined"
          color="secondary"
          required
          fullWidth
          helperText="Ingresar un correo valido"
          {...register("emal")}
        />
      </Box>
      <Box sx={{ marginBottom: "2rem" }}>
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          color="secondary"
          helperText="La contraseña debe tener minimo 8 caracteres"
          required
          fullWidth
          {...register("password")}
        />
      </Box>
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#865DFF",
          color: "white",
          "&:hover": {
            backgroundColor: "#6340D1",
          },
          "&:active": {
            backgroundColor: "#4A29A6",
          },
        }}
      >
        Enviar
      </Button>
    </Box>
  );
}
