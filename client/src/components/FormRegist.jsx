import { useForm } from "react-hook-form";
import { TextField, Box, Button, Grid } from "@mui/material";

export function FormRegist() {
  const { register } = useForm();
  return (
    <Box
      component="form"
      sx={{
        width: 500,
        height: 250,
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Grid container rowSpacing={4} spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Nombre"
            type="text"
            variant="outlined"
            color="secondary"
            required
            fullWidth
            {...register("last_name")}
          />
        </Grid>
        <Grid item xs={6}>
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
        </Grid>
        <Grid item xs={6}>
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
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Confirmar Contraseña"
            type="password"
            variant="outlined"
            color="secondary"
            helperText="Las contraseñas deben considir"
            required
            fullWidth
            {...register("password")}
          />
        </Grid>
      </Grid>
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
