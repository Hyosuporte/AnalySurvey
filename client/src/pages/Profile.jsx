import { NavbarProfile } from "../components/NavbarProfile";
import { GridView } from "../components/GridView";

const data = [
  { id: 1, title: "Item 1", description: "Description for Item 1" },
  { id: 2, title: "Item 2", description: "Description for Item 2" },
  // Agrega más datos aquí
];

export function Profile() {
  return (
    <main id="mainProfile">
      <NavbarProfile />
      <GridView data={data} />
    </main>
  );
}
