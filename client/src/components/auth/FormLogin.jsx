import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { Loading } from "../Loading";

export function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { singIn, isAuthenticated, errors: singInError, isLoading } = useAuth();
  const [redirect] = useState(location.state?.from || "/dashboard");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const onSubmit = (data) => singIn(data);

  if (isLoading) return <Loading />;

  return (
    <Box
      component="form"
      className="form-login"
      onSubmit={handleSubmit(onSubmit)}
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
      </Box>
      <Button variant="contained" size="large" className="button" type="submit">
        Enviar
      </Button>
      {/* FIXME:Mejorar styles alert */}
      {singInError.map((e, i) => (
        <Alert key={i} severity="error">
          {e}
        </Alert>
      ))}
    </Box>
  );
}
