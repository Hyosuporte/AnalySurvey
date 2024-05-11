/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LazyImage from "../LazyImage";

export function Card({ title, content, img, row, maxImg, maxText, clasN }) {
  return (
    <Grid
      container
      direction={row}
      justifyContent="center"
      alignItems="center"
      marginTop={15}
      className="card-container"
    >
      <Grid item xs={maxText}>
        <div className={clasN}>
          <Typography variant="h4">{title}</Typography>
          <p>{content}</p>
        </div>
      </Grid>
      <Grid item xs={maxImg}>
        <LazyImage src={img} alt={title} fetchpriority="low" />
      </Grid>
    </Grid>
  );
}
