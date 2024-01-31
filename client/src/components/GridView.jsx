/* eslint-disable react/prop-types */
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// eslint-disable-next-line react/prop-types
export function GridView({ data }) {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} md={4} key={item.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={item.image} // Reemplaza con la URL de la imagen
              alt={item.title}
            />
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>{item.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
