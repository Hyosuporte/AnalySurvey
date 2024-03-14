import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useForms } from "../context/FormsContext";

export function UpdateTitle({ id, title, open, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleClose = () => setOpen(false);
  const { updateForm } = useForms();
  const onSubmit = (data) => updateForm(id, data);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="form-title"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Renombrar formulario
          </Typography>
          <TextField
            id="modal-modal-description"
            type="text"
            defaultValue={title}
            variant="outlined"
            fullWidth
            color="secondary"
            error={Boolean(errors.titulo)}
            autoComplete="off"
            size="small"
            sx={{ mt: 3 }}
            {...register("titulo", {
              required: {
                value: true,
                message: "Es obligatorio poner un nombre*",
              },
            })}
          />
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
                className="button-grey"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                type="submit"
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
