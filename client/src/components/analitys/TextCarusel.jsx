import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

let settings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export function TextCarusel({ analitys }) {
  return (
    <>
      {" "}
      <Slider {...settings} className="item-carusel-pregunta-text">
        {analitys.respuestas.map((item, i) => (
          <div key={"respuestaText-" + i}>
            <p>{item}</p>
          </div>
        ))}
      </Slider>
    </>
  );
}
