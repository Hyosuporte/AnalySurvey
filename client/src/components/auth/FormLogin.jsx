import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import { useAuth } from '../../context/AuthContext';
import IconButton from '@mui/material/IconButton';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

export function FormLogin({ urlForm }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, errors: signInError } = useAuth();
  const [token, setToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const captchaRef = useRef(null);

  if (urlForm?.pathname == undefined) {
    urlForm = '/Espacio-de-Trabajo';
  } else if (urlForm?.pathname != '/Espacio-de-Trabajo') {
    urlForm = urlForm?.pathname;
  }

  const onSubmit = (data) => {
    if (!token) {
      return;
    }
    signIn(data, token);
  };

  return (
    <Box
      component="form"
      className="form-login"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box sx={{ marginBottom: '1.5rem' }}>
        <TextField
          label="Correo"
          type="email"
          variant="outlined"
          color="secondary"
          fullWidth
          helperText={errors.email?.message || 'Ingresar un correo valido'}
          error={Boolean(errors.email)}
          autoComplete="off"
          {...register('email', {
            required: { value: true, message: 'El correo es obligatorio*' },
          })}
        />
      </Box>
      <Box sx={{ marginBottom: '1.5rem' }}>
        <TextField
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          color="secondary"
          helperText={
            errors.password?.message ||
            'La contraseña debe tener minimo 8 caracteres'
          }
          error={Boolean(errors.password)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register('password', {
            required: {
              value: true,
              message: 'Contraseña es obligatoria*',
            },
            minLength: {
              value: 8,
              message: 'Debe tener minimo 8 caracteres*',
            },
            maxLength: {
              value: 15,
              message: 'Debe tener maximo 15 caracteres*',
            },
          })}
        />
        <Box sx={{ marginTop: '1rem' }}>
          <Link to="/login/forge-password"> Olvide mi contraseña </Link>
          {urlForm != '/Espacio-de-Trabajo' && (
            <>
              <br />
              <br />
              <Link to={urlForm} state={{ guest: true }}>
                Continuar como anonimo
              </Link>
            </>
          )}
        </Box>
      </Box>
      <HCaptcha
        ref={captchaRef}
        sitekey={import.meta.env.VITE_API_KEY_CHAPTER}
        onVerify={setToken}
      />
      <Button
        variant="contained"
        size="large"
        className="button"
        type="submit"
        aria-label="Iniciar Sesion"
      >
        Iniciar Sesion
      </Button>
      {/* FIXME:Mejorar styles alert */}
      {signInError.map((e, i) => (
        <Alert key={i} severity="error">
          {e}
        </Alert>
      ))}
    </Box>
  );
}
