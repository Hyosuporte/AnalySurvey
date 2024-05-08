import Typography from "@mui/material/Typography";
import img1 from "../../assets/image/relativo.png";
import img2 from "../../assets/image/absoluta.png";
import img3 from "../../assets/image/acumulada.png";
import img4 from "../../assets/image/regresion.png";
import img5 from "../../assets/image/desviacion.png";
import img6 from "../../assets/image/correlacion.jpg";
import img7 from "../../assets/image/covarianza.png";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import LazyImage from "../LazyImage";
import Slider from "react-slick";

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

let analisis = [
  {
    titulo: "Frecuencia Relativa",
    descripcion:
      "La frecuencia relativa es útil para entender qué proporción de veces ocurre un evento en relación con el total de eventos observados.",
    img: img1,
  },
  {
    titulo: "Frecuencia Absoluta",
    descripcion:
      "La frecuencia absoluta  cuenta cuántas veces ocurre un evento en un conjunto de datos.",
    img: img2,
  },
  {
    titulo: "Frecuencia Acumulada",
    descripcion:
      "La frecuencia acumulada es la suma acumulativa de las frecuencias absolutas de los eventos hasta un determinado punto en un conjunto de datos ordenados.",
    img: img3,
  },
  {
    titulo: "Regresion Lineal",
    descripcion:
      "La regresión lineal es un método estadístico que se utiliza para modelar la relación entre una o más variables independientes (predictoras) y una variable dependiente (respuesta) mediante una línea recta. Se usa para predecir valores de la variable dependiente basados en los valores de las variables independientes.",
    img: img4,
  },
  {
    titulo: "Desviacion estandar",
    descripcion:
      "La desviación estándar es una medida de dispersión que indica cuánto se alejan los valores de un conjunto de datos de su media aritmética. Es una forma de entender qué tan agrupados o dispersos están los datos alrededor de la media.",
    img: img5,
  },
  {
    titulo: "Coeficiente de Correlacion",
    descripcion:
      "El coeficiente de correlación es una medida estadística que describe la fuerza y la dirección de la relación entre dos variables. Puede variar entre -1 y 1, donde 1 indica una correlación positiva perfecta, -1 indica una correlación negativa perfecta, y 0 indica la ausencia de correlación lineal. En resumen, indica cuán estrechamente relacionadas están dos variables y en qué dirección.",
    img: img6,
  },
  {
    titulo: "Covarianza",
    descripcion:
      "La covarianza es una medida estadística que indica la dirección de la relación lineal entre dos variables. Específicamente, la covarianza describe cómo varían juntas dos variables: si tienden a aumentar o disminuir juntas, o si una aumenta mientras la otra disminuye. Una covarianza positiva indica que las variables tienden a moverse en la misma dirección, mientras que una covarianza negativa indica que tienden a moverse en direcciones opuestas. Sin embargo, la covarianza por sí sola no indica la fuerza de la relación entre las variables.",
    img: img7,
  },
];

export function CaruselAnaly() {
  return (
    <section className="carusel-template-anali">
      <Typography variant="h2">
        Ayuda con las tecnicas de analisis de datos
      </Typography>
      <br />
      <Slider {...settings} className="item-carusel">
        {analisis.map((item) => (
          <div>
            <div className="text-carusel-anali">
              <h4> {item.titulo} </h4>
              <p> {item.descripcion} </p>
            </div>
            <LazyImage src={item.img} alt={item.titulo} />
          </div>
        ))}
      </Slider>
    </section>
  );
}
