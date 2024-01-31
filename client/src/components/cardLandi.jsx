/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Card({ title, content, img, row, maxImg, maxText, clasN }) {
  return (
    <Grid
      container
      direction={row}
      justifyContent="center"
      alignItems="center"
      marginTop={10}
    >
      <Grid item xs={maxText}>
        <div className={clasN}>
          <Typography
            variant="h4"
            sx={{
              color: "#865DFF",
            }}
          >
            {title}
          </Typography>
          <p>{content}</p>
        </div>
      </Grid>
      <Grid item xs={maxImg}>
        <img src={img} alt="" width="510vw" />
      </Grid>
    </Grid>
  );
}

export function CardList({ data }) {
  return (
    <section id="CardList">
      {data.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          content={item.content}
          img={item.img}
          row={item.row}
          maxImg={item.maxImg}
          maxText={item.maxText}
          clasN={item.clasN}
        />
      ))}
    </section>
  );
}

CardList.prototype = {
  data: PropTypes.array.isRequired,
};
