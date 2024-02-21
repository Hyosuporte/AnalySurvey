import { NavbarProfile } from "../components/NavbarProfile";
import { GridView } from "../components/GridView";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import img1 from "../assets/image/img1.jpg";
import { Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const data = [
  {
    id: 1,
    title: "Item 1",
    description: "Description for Item 1",
    image: img1,
  },
  { id: 2, title: "Item 2", description: "Description for Item 2" },
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
      <GridView data={data} />
    </main>
  );
}
