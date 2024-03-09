import { useAuth } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { useEffect } from "react";

export function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { singIn, isAuthenticated, errors: singInError } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => singIn(data);

  return (
    <Box
      component="form"
      sx={{
        width: 350,
        height: 250,
        margin: "auto",
        textAlign: "center",
      }}
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
            /*  TODO:Recordar que la contraseña esta con 2 caracteres en vez de 8 */
            minLength: {
              value: 2,
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
