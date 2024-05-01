import { CaruselTemplate } from "../components/Home/CaruselTemplate";
import { NavbarHome } from "../components/Home/NavbarHome";
import { CardList } from "../components/Home/cardLandi";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import img1 from "../assets/image/img1.jpg";
import img2 from "../assets/image/img2.jpg";
import img3 from "../assets/image/img3.jpg";

const cardData = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus ut ex quis ullamcorper. Vestibulum ultrices cursus mi. Curabitur ut nulla ac lorem interdum vestibulum sed eget nibh",
    img: img2,
    row: "row",
    maxImg: 4,
    maxText: 5,
    clasN: "card",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus ut ex quis ullamcorper. Vestibulum ultrices cursus mi. Curabitur ut nulla ac lorem interdum vestibulum sed eget nibh",
    img: img3,
    row: "row-reverse",
    maxImg: 5,
    maxText: 4,
    clasN: "card-reverse",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus ut ex quis ullamcorper. Vestibulum ultrices cursus mi. Curabitur ut nulla ac lorem interdum vestibulum sed eget nibh",
    img: img3,
    row: "row",
    maxImg: 4,
    maxText: 5,
    clasN: "card",
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus ut ex quis ullamcorper. Vestibulum ultrices cursus mi. Curabitur ut nulla ac lorem interdum vestibulum sed eget nibh",
    img: img2,
    row: "row-reverse",
    maxImg: 5,
    maxText: 4,
    clasN: "card-reverse",
  },
];

export function HomePage() {
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
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto
          </Typography>
          <p>
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto. Lorem Ipsum
          </p>
        </div>
        <img src={img1} alt="" width="45%" />
      </Grid>
      <CardList data={cardData} />
      <CaruselTemplate />
      <footer id="footerLandi">
        <Typography variant="h3" sx={{ color: "white" }}>
          Lo que ofrecemos
        </Typography>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta
          nisi at metus iaculis, ac congue ex fringilla. Fusce id orci suscipit,
          ultricies tellus id, consequat quam. Duis rutrum luctus nisl, eu
          maximus orci tristique id. Suspendisse pellentesque risus nec mollis
          blandit.
        </p>
      </footer>
    </main>
  );
}
