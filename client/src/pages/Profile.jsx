import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { NavbarProfile } from "../components/NavbarProfile";
import GridViewIcon from "@mui/icons-material/GridView";
import ToggleButton from "@mui/material/ToggleButton";
import { GridView } from "../components/GridView";
import { ListView } from "../components/ListView";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import { useState } from "react";

const data = [
  {
    id: 1,
    title: "Item 1",
    description: "Description for Item 1",
  },
  {
    id: 2,
    title: "Item 2",
    description: "Description for Item 2",
  },
  // Agrega más datos aquí
];

export function Profile() {
  const [alignment, setAligment] = useState("Grid");

  const handleChange = (event, newAlignment) => {
    setAligment(newAlignment);
  };

  return (
    <main id="mainProfile">
      <NavbarProfile />
      <section className="work-space">
        <Typography
          variant="h6"
          sx={{
            color: "black",
          }}
        >
          Espacio de trabajo
        </Typography>
        <Grid
          className="list-changeView"
          container
          justifyContent="space-between"
        >
          <Grid item>
            <Button
              className="button"
              startIcon={<AddIcon className="icon-white" />}
            >
              <Link className="link" href="/login">
                Crear Encuesta
              </Link>
            </Button>
          </Grid>
          <Grid item>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="View-Alignment"
              size="small"
            >
              <ToggleButton className="button-view" value="Grid">
                <GridViewIcon />
                Grid
              </ToggleButton>
              <ToggleButton className="button-view" value="List">
                <FormatListBulletedIcon />
                List
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </section>
      {/* TODO: Terminar componente Grid */}
      {alignment == "Grid" ? <GridView data={data} /> : <ListView />}
    </main>
  );
}
