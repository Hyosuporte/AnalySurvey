import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";

export function FormRegist({ setShowComponent }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const { singUp, errors: singUpError } = useAuth();

  const onSubmit = (data) => {
    setLoading(true);
    singUp(data).then(() => {
      setLoading(false);
      setShowComponent("CodeEmail");
    });
  };

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
                value: 16,
                message: "Debe tener maximo 15 caracteres*",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                message:
                  "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
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
      <Button
        variant="contained"
        size="large"
        className="button"
        type="submit"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Registrar"}
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
