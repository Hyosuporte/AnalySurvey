import { NavbarProfile } from "../components/profile/NavbarProfile";
import { GridView } from "../components/profile/GridView";
import { ListView } from "../components/profile/ListView";
import { useEffect, useState } from "react";
import { useForms } from "../context/FormsContext";
import { OptionViews } from "../components/profile/OptionViews";

export function Profile() {
  const { forms, getForms } = useForms();
  const [alignment, setAligment] = useState("Grid");

  useEffect(() => {
    getForms();
  }, []);
  return (
    <main id="mainProfile">
      <NavbarProfile />
      <OptionViews setAligment={setAligment} />
      {/* TODO: Terminar componente Grid */}
      {alignment == "Grid" ? (
        <GridView data={forms} />
      ) : (
        <ListView data={forms} />
      )}
    </main>
  );
}
