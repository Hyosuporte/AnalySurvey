import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { LogMenu } from "./LogMenu";

export function GridView({ data, alert }) {
  return (
    <Grid container spacing={2} className="GridView">
      {!data || data.length === 0 ? (
        <p>No hay encuestas aun</p>
      ) : (
        data.map(({ id, titulo, campos }) => (
          <Grid item xs={10} md={2} key={id}>
            <Card
              sx={{
                "&: hover": {
                  boxShadow: "2px 2px 10px 0px rgba(0,0,0,0.53)",
                },
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Link to={`/survey/create/${id}`}>
                    <Typography variant="h5" className="text-center">
                      {titulo}
                    </Typography>
                  </Link>
                </CardContent>
              </CardActionArea>
              <CardActions disableSpacing>
                <p>Respuestas: {campos[0]?.respuestas?.length ?? 0}</p>
                <LogMenu id={id} title={titulo} alert={alert} />
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}
