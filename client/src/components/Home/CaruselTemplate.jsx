import { useForms } from "../../context/FormsContext";
import { useAuth } from "../../context/AuthContext";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/image/img4.jpg";
import img2 from "../../assets/image/img5.jpg";
import "slick-carousel/slick/slick-theme.css";
import Button from "@mui/material/Button";
import "slick-carousel/slick/slick.css";
import LazyImage from "../LazyImage";
import Slider from "react-slick";
import { useState } from "react";

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
//FIXME: Add the correct path to the images and the correct text

export function CaruselTemplate() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, setPendiente } = useAuth();
  const { duplicateForm } = useForms();
  const navigate = useNavigate();

  const handleDuplicate = (id) => {
    if (isAuthenticated) {
      setIsLoading(true);
      duplicateForm(id).then((res) => {
        setIsLoading(false);
        if (res) navigate("/dashboard");
      });
    } else {
      setPendiente(() => () => duplicateForm(id));
      navigate("/login");
    }
  };

  return (
    <section className="carusel-template" id="CaruselTemplate">
      <Typography variant="h6">Plantillas</Typography>
      <Typography variant="h2">Nuestras plantillas recomendadas</Typography>
      <Slider {...settings} className="item-carusel">
        <div>
          <div className="text-carusel">
            <h4>Valoracion</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              porta nisi at metus iaculis, ac congue ex fringilla. Fusce id orci
              suscipit, ultricies tellus id, consequat quam. Duis rutrum luctus
              nisl, eu maximus orci tristique id. Suspendisse pellentesque risus
              nec mollis blandit.
            </p>
            <Button
              variant="contained"
              onClick={() => handleDuplicate(2)}
              size="medium"
              className="button"
            >
              {isLoading ? "Cargando..." : "Comenzar ahora"}
            </Button>
          </div>
          <LazyImage src={img1} alt="Plantilla 1" />
        </div>
        <div>
          <div className="text-carusel">
            <h4>Valoracion</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce .
            </p>

            <Button
              variant="contained"
              onClick={() => handleDuplicate(3)}
              size="medium"
              className="button"
            >
              {isLoading ? "Cargando..." : "Comenzar ahora"}
            </Button>
          </div>
          <LazyImage src={img2} alt="Plantilla 2" />
        </div>
      </Slider>
    </section>
  );
}
