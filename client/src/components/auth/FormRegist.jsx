import { useAuth } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect } from "react";

export function FormRegist() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const { singUp, isAuthenticated, errors: singUpError } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => singUp(data);

  return (
    <Box
      component="form"
      className="form-regist"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container rowSpacing={4} spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Usuario"
            type="text"
            variant="outlined"
            color="secondary"
            fullWidth
            helperText={
              errors.username?.message || "Ingresar un usuario valido"
            }
            error={Boolean(errors.username)}
            {...register("username", {
              required: {
                value: true,
                message: "El usuario es requerido",
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
            /* FIXME: Mirar si dejar el auto completdo autoComplete="off" */
            error={Boolean(errors.email)}
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
      {/* FIXME:Mejorar styles alert */}
      {singUpError.map((e, i) => (
        <Alert key={i} severity="error">
          {e}
        </Alert>
      ))}
    </Box>
  );
}
