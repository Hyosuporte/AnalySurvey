import { NavbarLandig } from "../components/NavbarLandig";
import { MainLandi } from "../components/MainLandi";
import { CardList } from "../components/cardLandi";
import { CaruselTemplate } from "../components/CaruselTemplate";
import img1 from "../assets/image/img3.jpg";
import img2 from "../assets/image/img2.jpg";

const cardData = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus ut ex quis ullamcorper. Vestibulum ultrices cursus mi. Curabitur ut nulla ac lorem interdum vestibulum sed eget nibh",
    img: img1,
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus ut ex quis ullamcorper. Vestibulum ultrices cursus mi. Curabitur ut nulla ac lorem interdum vestibulum sed eget nibh",
    img: img2,
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus ut ex quis ullamcorper. Vestibulum ultrices cursus mi. Curabitur ut nulla ac lorem interdum vestibulum sed eget nibh",
    img: img1,
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus ut ex quis ullamcorper. Vestibulum ultrices cursus mi. Curabitur ut nulla ac lorem interdum vestibulum sed eget nibh",
    img: img2,
  },
];

export function Landing() {
  return (
    <main>
      <NavbarLandig/>
      <MainLandi/>
      <CardList data={cardData} />
      <CaruselTemplate />
      <footer>
        <h1>Lo que ofrecemos</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta
          nisi at metus iaculis, ac congue ex fringilla. Fusce id orci suscipit,
          ultricies tellus id, consequat quam. Duis rutrum luctus nisl, eu maximus
          orci tristique id. Suspendisse pellentesque risus nec mollis blandit.
        </p>
      </footer>
    </main>
  );
}
