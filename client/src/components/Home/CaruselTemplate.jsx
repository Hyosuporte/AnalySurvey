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
import Slider from "react-slick";
import { useState } from "react";

let settings = {
  infinite: true,
  speed: 500,
  initialSlide: 1,
  adaptiveHeight: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

let plantilla = [
  {
    titulo: "Escala de licker",
    descripcion:
      "La Escala de Licker consiste en una serie de afirmaciones sobre el tema de interés, a las cuales los participantes responden indicando su grado de acuerdo o desacuerdo con cada afirmación. Esta escala la puedes usar para medir aptitudes, opiniones, evaluaciones y entre otras maneras cuantitativas.",
    img: img1,
    Survey: 2,
  },
  {
    titulo: "Encuesta de Si o No",
    descripcion:
      "Esta encuesta esta creada con preguntas aleatorias pero con respuestas de si o no. La puedes utilizar en dado caso que necesites opiniones imparciales acerca de un tema en específico.",
    img: img2,
    Survey: 3,
  },
  {
    titulo: "Encuesta de satisfaccion",
    descripcion:
      "Esta encuesta esta pensada para cuando desees calificar una aplicativo, trabajo, software, etc.",
    img: img3,
    Survey: 4,
  },
];

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
      <Typography variant="h2">Nuestras plantillas recomendadas</Typography>
      <br />
      <Slider {...settings} className="item-carusel">
        {plantilla.map((item, i) => (
          <div key={item.titulo + "-" + i}>
            <div className="text-carusel">
              <h4> {item.titulo} </h4>
              <p> {item.descripcion} </p>
              <Button
                variant="contained"
                onClick={() => handleDuplicate(item.Survey)}
                size="medium"
                className="button"
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Comenzar ahora"}
              </Button>
            </div>
            <img src={item.img} alt={item.titulo} />
          </div>
        ))}
      </Slider>
    </section>
  );
}
