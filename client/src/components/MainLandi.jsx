import { Link } from "react-router-dom";
import { Grid, Typography, Button } from "@mui/material";
import img1 from "../assets/image/img1.jpg";

export function MainLandi() {
  return (
    <Grid
      container
      justifyContent="space-between"
      sx={{ marginTop: "0", alignItems: "center", marginBottom: "12rem" }}
      id="MainLandi"
    >
      <Grid item md={4} sx={{ marginLeft: "10rem" }}>
        <Typography variant="h1" sx={{ color: "#865DFF", fontSize: "2.5rem" }}>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto<span>.</span>
        </Typography>
        <p style={{ marginTop: "1rem" }}>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum
        </p>
        <Link>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#865DFF",
              color: "white",
              padding: "1rem",
              marginTop: "1rem",
              "&:hover": {
                backgroundColor: "#6340D1",
              },
              "&:active": {
                backgroundColor: "#4A29A6",
              },
            }}
          >
            Comenzar ahora
          </Button>
        </Link>
      </Grid>
      <Grid item md={5}>
        <img
          src={img1}
          alt=""
          width="100%"
          style={{ borderRadius: "60px 0 0 60px" }}
        />
      </Grid>
    </Grid>
  );
}
