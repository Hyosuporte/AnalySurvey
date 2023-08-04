import { Link } from "react-router-dom";
import img1 from "../assets/image/img1.jpg";

export function MainLandi() {
  return (
    <section className="main-Landig">
      <div>
        <h1>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto<span>.</span>
        </h1>
        <p>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum
        </p>
        <Link>
          <button>Comenzar ahora</button>
        </Link>
      </div>
      <img src={img1} alt="" />
    </section>
  );
}
