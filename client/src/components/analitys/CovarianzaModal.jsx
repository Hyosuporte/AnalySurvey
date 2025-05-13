import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { getCovarianza } from '../../api/forms';

export function CovarianzaModal({ open, handleClose, ask }) {
  const [step, setStep] = useState(1);
  const [rangeSelect, setRangeSelect] = useState('');
  const [askFilter, setAskFilter] = useState([]);
  const [selection, setSelection] = useState([]);
  const [covarianza, setCovarianza] = useState(null);

  const handleRangeChange = (rangeSelect) => {
    const range = rangeSelect;
    setRangeSelect(range);
    ask = ask.filter((a) => a.tipoPregunta == 4);
    setAskFilter(ask.filter((a) => a.respuestas.length == range));
    setSelection([]);
  };

  const handleSelection = (ask) => {
    if (selection.includes(ask)) {
      setSelection(selection.filter((a) => a.id !== ask.id));
    } else if (selection.length < 2) {
      setSelection([...selection, ask]);
    }
  };

  const calculateCovarianza = () => {
    if (selection.length !== 2) {
      alert('Por favor, selecciona exactamente 2 preguntas.');
      return;
    }

    const pregunta1 = selection[0].respuestas.map((item) => item.total);
    const pregunta2 = selection[1].respuestas.map((item) => item.total);

    getCovarianza({
      pregunta1,
      pregunta2,
    })
      .then((response) => {
        setCovarianza(parseFloat(response.data.covarianza).toFixed(2));
        setStep(3);
      })
      .catch((error) =>
        console.error('Error al calcular la covarianza:', error)
      );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="form-title form-covarianza">
        {step === 1 && (
          <>
            <Typography variant="h6" component="h2" alignContent="center">
              Analisis Covarianza
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              sx={{ mt: 2 }}
              spacing={2}
            >
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => setStep(2)}
                  aria-label="Seleccionar preguntas"
                >
                  Seleccionar preguntas
                </Button>
              </Grid>
            </Grid>
          </>
        )}

        {step === 2 && (
          <>
            <Typography variant="h6" component="h2" alignContent="center">
              Seleccionar Pregunta
            </Typography>
            <label>Rango de puntuacion : </label>
            <Select
              size="small"
              value={rangeSelect}
              onChange={(e) => handleRangeChange(e.target.value)}
            >
              <MenuItem value="3">1-3</MenuItem>
              <MenuItem value="5">1-5</MenuItem>
              <MenuItem value="10">1-10</MenuItem>
            </Select>

            {askFilter.length > 0 && (
              <div>
                {askFilter.map((a) => (
                  <div
                    key={a.id}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <input
                      type="checkbox"
                      checked={selection.includes(a)}
                      onChange={() => handleSelection(a)}
                      disabled={
                        selection.length === 2 && !selection.includes(a)
                      }
                    />
                    <span> {a.titulo} </span>
                  </div>
                ))}
              </div>
            )}

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              sx={{ mt: 2 }}
              spacing={2}
            >
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  type="submit"
                  aria-label="Guardar"
                  onClick={calculateCovarianza}
                >
                  Calcular Covarianza
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  className="button-grey"
                  aria-label="Cancelar"
                  onClick={() => setStep(1)}
                >
                  Volver
                </Button>
              </Grid>
            </Grid>
          </>
        )}

        {step === 3 && (
          <>
            <Box>
              <Typography variant="h6" component="h2" alignContent="center">
                Resultado
              </Typography>
              <p style={{ color: 'black', textAlign: 'center' }}>
                {'La covarianza entre las preguntas es: '}
                {covarianza}
              </p>
            </Box>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              sx={{ mt: 2 }}
              spacing={1}
            >
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  className="button-grey"
                  aria-label="Cancelar"
                  onClick={handleClose}
                >
                  Cerrar
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Modal>
  );
}
