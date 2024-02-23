/* eslint-disable react/prop-types */
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { LogMenu } from "./LogMenu";

// eslint-disable-next-line react/prop-types
export function GridView({ data }) {
  return (
    <Grid container spacing={2} className="GridView">
      {data.map((item) => (
        <Grid item xs={10} md={2} key={item.id}>
          <Card
            sx={{
              "&: hover": {
                boxShadow: "2px 2px 10px 0px rgba(0,0,0,0.53)",
              },
            }}
          >
            <CardActionArea>
              <CardContent>
                <Link to="create">
                  <Typography variant="h5" className="text-center">
                    {item.title}
                  </Typography>
                </Link>
              </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
              <p> Respuestas </p>
              <LogMenu />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
