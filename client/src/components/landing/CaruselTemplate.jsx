import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "react-slick";
import img1 from "../../assets/image/img4.jpg";
import img2 from "../../assets/image/img5.jpg";

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  cssEase: "linear",
};
//FIXME: Add the correct path to the images and the correct text

export function CaruselTemplate() {
  return (
    <section className="carusel-template" id="CaruselTemplate">
      <Typography variant="h6">Plantillas</Typography>
      <Typography variant="h2">Nuestras plantillas recomendadas</Typography>
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
            <Button variant="contained" size="medium" className="button">
              <Link to="/templates">Comenzar ahora</Link>
            </Button>
          </div>
          <img src={img1} />
        </div>
        <div>
          <div className="text-carusel">
            <h4>Valoracion</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce .
            </p>

            <Button variant="contained" size="medium" className="button">
              <Link to="/templates">Comenzar ahora</Link>
            </Button>
          </div>
          <img src={img2} />
        </div>
      </Slider>
    </section>
  );
}
