import { useForms } from "../../context/FormsContext";
import { useAuth } from "../../context/AuthContext";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/image/img4.jpg";
import img2 from "../../assets/image/img5.jpg";
import img3 from "../../assets/image/img2.jpg";
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
      <Typography variant="h2">Nuestras plantillas recomendadas</Typography>{" "}
      <br />
      <Slider {...settings} className="item-carusel">
        <div>
          <div className="text-carusel">
            <h4>Escala de licker</h4>
            <p>
              La Escala de Licker consiste en una serie de afirmaciones sobre el
              tema de interés, a las cuales los participantes responden
              indicando su grado de acuerdo o desacuerdo con cada afirmación.
              Esta escala la puedes usar para medir aptitudes, opiniones,
              evaluaciones y entre otras maneras cuantitativas.
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
            <h4>Encuesta de Si o No</h4>
            <p>
              Esta encuesta esta creada con preguntas aleatorias pero con
              respuestas de si o no. La puedes utilizar en dado caso que
              necesites opiniones imparciales acerca de un tema en específico.
            </p>

            <Button
              variant="contained"
              onClick={() => handleDuplicate(23)}
              size="medium"
              className="button"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Comenzar ahora"}
            </Button>
          </div>
          <LazyImage src={img2} alt="Plantilla 2" />
        </div>
        <div>
          <div className="text-carusel">
            <h4>Encuesta de recopilacion</h4>
            <p>
              Esta encuesta esta pensada para cuando desees recopilar datos
              acerca de un grupo.
            </p>

            <Button
              variant="contained"
              onClick={() => handleDuplicate(24)}
              size="medium"
              className="button"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Comenzar ahora"}
            </Button>
          </div>
          <LazyImage src={img3} alt="Plantilla 2" />
        </div>
      </Slider>
    </section>
  );
}
