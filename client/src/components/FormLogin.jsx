import { useForm } from "react-hook-form";
import { TextField, Box, Button } from "@mui/material";

export function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <Box
      component="form"
      sx={{
        width: 350,
        height: 250,
        margin: "auto",
        textAlign: "center",
      }}
      onSubmit={onSubmit}
    >
      <Box sx={{ marginBottom: "2rem" }}>
        <TextField
          label="Correo"
          type="email"
          variant="outlined"
          color="secondary"
          fullWidth
          helperText={errors.email?.message || "Ingresar un correo valido"}
          error={Boolean(errors.email)}
          autoComplete="off"
          {...register("email", {
            required: { value: true, message: "El correo es obligatorio*" },
          })}
        />
      </Box>
      <Box sx={{ marginBottom: "2rem" }}>
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          color="secondary"
          helperText={
            errors.password?.message ||
            "La contraseña debe tener minimo 8 caracteres"
          }
          error={Boolean(errors.password)}
          fullWidth
          {...register("password", {
            required: {
              value: true,
              message: "Contraseña es obligatoria*",
            },
            minLength: { value: 8, message: "Debe tener minimo 8 caracteres*" },
            maxLength: {
              value: 15,
              message: "Debe tener maximo 15 caracteres*",
            },
          })}
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
        type="submit"
      >
        Enviar
      </Button>
    </Box>
  );
}
