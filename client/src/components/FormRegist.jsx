import { useForm } from "react-hook-form";
import { TextField, Box, Button, Grid } from "@mui/material";

export function FormRegist() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data, errors);
  });
  return (
    <Box
      component="form"
      sx={{
        width: 500,
        height: 250,
        margin: "auto",
        textAlign: "center",
      }}
      onSubmit={onSubmit}
    >
      <Grid container rowSpacing={4} spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Nombre"
            type="text"
            variant="outlined"
            color="secondary"
            fullWidth
            helperText={
              errors.last_name?.message || "Ingresar un nombre valido"
            }
            error={Boolean(errors.last_name)}
            {...register("last_name", {
              required: {
                value: true,
                message: "El nombre es requerido",
              },
            })}
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
            helperText={errors.email?.message || "Ingresar un correo valido"}
            error={Boolean(errors.email)}
            autoComplete="off"
            {...register("email", {
              required: { value: true, message: "El correo es obligatorio*" },
            })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            color="secondary"
            fullWidth
            helperText={
              errors.password?.message || "Debe tener minimo 8 caracteres"
            }
            error={Boolean(errors.password)}
            {...register("password", {
              required: {
                value: true,
                message: "La contraseña es obligatoria",
              },
              minLength: {
                value: 8,
                message: "Debe tener minimo 8 caracteres*",
              },
              maxLength: {
                value: 15,
                message: "Debe tener maximo 15 caracteres*",
              },
            })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Confirmar Contraseña"
            type="password"
            variant="outlined"
            color="secondary"
            fullWidth
            helperText={errors.Trypassword?.message}
            error={Boolean(errors.Trypassword)}
            {...register("Trypassword", {
              validate: (value) =>
                value == watch("password") || "Las contraseñas deben concidir",
            })}
          />
        </Grid>
      </Grid>
      <Button variant="contained" size="large" className="button" type="submit">
        Enviar
      </Button>
      {/*TODO:  Quitar el mensaje de validacion del JSON del formulari oregistrar
       */}
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </Box>
  );
}
