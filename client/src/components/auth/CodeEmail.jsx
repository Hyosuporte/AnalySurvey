import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../context/AuthContext";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";

export function CodeEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { codeAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    codeAuth(data);
  };

  return (
    <Box
      component="form"
      className="form-codeEmail"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: "1rem" }}
      >
        Codigo de verificación
      </Typography>
      <TextField
        type="text"
        sx={{ marginBottom: "1rem" }}
        color="secondary"
        helperText={errors.code?.message || "Debe tener minimo 5 caracteres"}
        error={Boolean(errors.code)}
        {...register("code", {
          required: {
            value: true,
            message: "Campo requerido*",
          },
          minLength: {
            value: 5,
            message: "Debe tener minimo 5 caracteres*",
          },
          maxLength: {
            value: 5,
            message: "Debe tener maximo 5 caracteres*",
          },
        })}
      />
      <Button
        variant="contained"
        size="large"
        className="button"
        type="submit"
        disabled={loading}
        aria-label="Activar cuenta"
      >
        {loading ? <CircularProgress size={24} /> : "Activar cuenta"}
      </Button>
    </Box>
  );
}
