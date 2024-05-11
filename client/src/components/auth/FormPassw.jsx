import { useAuth } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FormPassw() {
  const { codeRecu, codeReset, errors } = useAuth();
  const [password, setPassword] = useState("");
  const [loadin, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const isEmailValid = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isCodeValid = (code) => {
    const re = /^\S{5}$/;
    return re.test(code);
  };

  const isPasswordValid = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return re.test(password);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    codeReset(code, email, password).then(() => navigate("/login"));
  };

  return (
    <Box component="form" className="form-login" onSubmit={handleSubmit}>
      <h4>Restablecer contraseña</h4>
      <Box sx={{ marginBottom: "1rem", marginTop: "2rem" }}>
        <TextField
          label="Correo"
          type="email"
          variant="outlined"
          color="secondary"
          fullWidth
          size="small"
          value={email}
          onChange={handleEmailChange}
        />
      </Box>
      <Box sx={{ marginBottom: "1rem" }}>
        <TextField
          label="Codigo validacion"
          type="text"
          variant="outlined"
          color="secondary"
          placeholder="Codigo de 5 digitos"
          inputProps={{ maxLength: 5 }}
          size="small"
          value={code}
          onChange={handleCodeChange}
        />
        <Button
          variant="contained"
          className="button"
          size="medium"
          type="button"
          disabled={!isEmailValid(email)}
          onClick={() => codeRecu(email)}
        >
          Enviar codigo
        </Button>
      </Box>
      <Box sx={{ marginBottom: "2rem" }}>
        <TextField
          placeholder="Contraseña nueva"
          variant="outlined"
          color="secondary"
          type="password"
          value={password}
          size="small"
          onChange={handlePasswordChange}
          error={!isPasswordValid(password)}
          helperText="La contraseña debe tener minimo 8 caracteres"
          fullWidth
        />
      </Box>
      <Button
        variant="contained"
        size="large"
        className="button"
        type="submit"
        aria-label="Cambiar contraseña"
        disabled={!isCodeValid(code) || !isEmailValid(email) || loadin}
      >
        Cambiar contraseña
      </Button>
      {/* FIXME:Mejorar styles alert */}
      {errors.map((e, i) => (
        <Alert key={i} severity="error">
          {e}
        </Alert>
      ))}
    </Box>
  );
}
