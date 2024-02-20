import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Slider from "react-slick";
import img1 from "../assets/image/img4.jpg";
import img2 from "../assets/image/img5.jpg";

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  cssEase: "linear",
};

export function CaruselTemplate() {
  return (
    <section className="carusel-template" id="CaruselTemplate">
      <Typography variant="h6">Plantillas</Typography>

      <Typography
        variant="h2"
        sx={{
          fontWeight: "900",
        }}
      >
        Nuestras plantillas recomendadas
      </Typography>

      <Slider {...settings} className="item-carusel">
        <div>
          <div className="text-carusel">
            <Typography variant="h4">Valoracion</Typography>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              porta nisi at metus iaculis, ac congue ex fringilla. Fusce id orci
              suscipit, ultricies tellus id, consequat quam. Duis rutrum luctus
              nisl, eu maximus orci tristique id. Suspendisse pellentesque risus
              nec mollis blandit.
            </p>
            <Link to="/templates">
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#865DFF",
                  color: "white",
                  padding: "1rem",
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
          </div>
          <img src={img1} />
        </div>
        <div>
          <div className="text-carusel">
            <h4>Valoracion</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce .
            </p>

            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#865DFF",
                color: "white",
                padding: "1rem",
                "&:hover": {
                  backgroundColor: "#6340D1",
                },
                "&:active": {
                  backgroundColor: "#4A29A6",
                },
              }}
            >
              <Link to="/templates">Comenzar ahora</Link>
            </Button>
          </div>
          <img src={img2} />
        </div>
      </Slider>
    </section>
  );
}
