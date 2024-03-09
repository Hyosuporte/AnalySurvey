/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export function ListView({ data, alert }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const CopyUrl = (id) => {
    navigator.clipboard
      .writeText(`http://localhost:5173/forms/${id}`)
      .then(() => {
        alert(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box component="section" className="ListView">
      {data.length === 0 ? (
        /*FIXME: Mejorar el style del mensaje de no found forms */
        <p>No hay encuestas aun</p>
      ) : (
        <Stack
          id="stack"
          spacing={2}
          direction="column"
          justifyContent="flex-start"
          alignItems="baseline"
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h5" color="black"></Typography>
              <Typography
                sx={{ fontSize: ".8rem" }}
                color="text.secondary"
              ></Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item> Preguntas </Grid>
                <Grid item> Respuestas </Grid>
                <Grid item> Actualizacion </Grid>
              </Grid>
            </Grid>
          </Grid>

          {data.map((item) => (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              key={item.id}
              id="stack-list"
            >
              <Grid item>
                <Typography variant="h5" color="black">
                  {item.titulo}
                </Typography>
                <Typography sx={{ fontSize: ".8rem" }} color="text.secondary">
                  creacion : {formatDate(item.creado_en)}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={12} alignItems="center">
                  <Grid item>
                    <Button variant="outlined" color="secondary">
                      Editar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={() => CopyUrl(item.id)}
                      color="secondary"
                    >
                      Compartir
                    </Button>
                  </Grid>
                  <Grid item>
                    {item.campos && item.campos[0] ? item.campos.length : 0}
                  </Grid>
                  <Grid item>
                    {item.campos && item.campos[0] && item.campos[0].respuestas
                      ? item.campos[0].respuestas.length
                      : 0}
                  </Grid>
                  <Grid item> {formatDate(item.actualizado_en)} </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Stack>
      )}
    </Box>
  );
}
