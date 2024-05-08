import { CaruselTemplate } from "../components/Home/CaruselTemplate";
import { CaruselAnaly } from "../components/Home/CaruselAnaly";
import { NavbarHome } from "../components/Home/NavbarHome";
import { Card } from "../components/Home/cardLandi";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import img1 from "../assets/image/img1.jpg";
import crearEncuesta from "../assets/image/CrearEncuesta.png";
import compartirEncuesta from "../assets/image/compartirEncuesta.png";
import generarReporte from "../assets/image/img2.jpg";

const cardData = [
  {
    id: 1,
    title: "Creacion de encuestas",
    content:
      "Crear encuestas es fácil. Puedes empezar desde cero haciendo clic aquí o partir de una plantilla haciendo clic aquí. Una vez estés allí, haz clic en el icono + para agregar preguntas según tu preferencia.",
    img: crearEncuesta,
    row: "row",
    maxImg: 4,
    maxText: 5,
    clasN: "card",
  },
  {
    id: 2,
    title: "Compartir encuestas",
    content:
      "Una vez creadas tus encuestas, podrás compartirlas para recopilar respuestas. Recuerda que los usuarios deben iniciar sesión o registrarse en la plataforma para responder. En la vista de dashboard, haz clic en los tres puntos y selecciona 'Compartir' para generar un enlace que podrás enviar a las personas que quieras que respondan la encuesta.",
    img: compartirEncuesta,
    row: "row-reverse",
    maxImg: 5,
    maxText: 4,
    clasN: "card-reverse",
  },
  {
    id: 3,
    title: "Generar reportes",
    content:
      "Una vez hayas recopilado las respuestas de los encuestados, podrás acceder al módulo de respuestas. Allí podrás visualizar diversas gráficas generadas mediante el análisis de datos. Si deseas generar un reporte, simplemente haz clic en 'Generar reporte' y las respuestas se descargarán en formato Excel",
    img: generarReporte,
    row: "row",
    maxImg: 4,
    maxText: 5,
    clasN: "card",
  },
];

export default function HomePage() {
  return (
    <main className="home-page">
      <NavbarHome />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="container-card"
      >
        <div className="text-card">
          <Typography variant="h5">
            Bienvenido a Analy Survey una aplicacion gratuita y a tu alcance
          </Typography>
          <p>
            Realiza tus encuestas de manera agil y eficaz junto con un analisis
            de datos preciso
          </p>
        </div>
        <img src={img1} alt="" width="45%" />
      </Grid>
      <section id="CardList">
        {cardData.map((item) => (
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
      <CaruselTemplate />
      <CaruselAnaly />

      <footer></footer>
    </main>
  );
}
