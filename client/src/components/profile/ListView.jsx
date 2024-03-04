/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export function ListView({ data }) {
  return (
    <Box component="section" className="ListView">
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
            <Typography variant="h5" color="black">

            </Typography>
            <Typography sx={{ fontSize: ".8rem" }} color="text.secondary">
              
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
            
              <Grid item> Preguntas </Grid>
              <Grid item> Respuestas </Grid>
              <Grid item> Actualizacion  </Grid>
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
                {" "}
                {item.title}{" "}
              </Typography>
              <Typography sx={{ fontSize: ".8rem" }} color="text.secondary">
                creacion : {item.created}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={10}>
                <Grid item>
                  <Button variant="outlined" color="secondary">
                    Editar
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="secondary">
                    Compartir
                  </Button>
                </Grid>
                <Grid item> {item.questions} </Grid>
                <Grid item> {item.response} </Grid>
                <Grid item> {item.updated} </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Stack>
    </Box>
  );
}
