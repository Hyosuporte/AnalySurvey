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
    created: "22 Feb 2024",
    questions: "4",
    response: "14",
    updated: "14 Enero 2024"
  },
  {
    id: 2,
    title: "Item 2",
    description: "Description for Item 2",
    created: "22 Feb 2024",
    questions: "4",
    response: "14",
    updated: "14 Enero 2024"
  },
  {
    id: 3,
    title: "Item 3",
    description: "Description for Item 3",
    created: "22 Feb 2024",
    questions: "4",
    response: "14",
    updated: "14 Enero 2024"
  },
  {
    id: 4,
    title: "Item 4",
    description: "Description for Item 4",
    created: "22 Feb 2024",
    questions: "4",
    response: "14",
    updated: "14 Enero 2024"
  },
  {
    id: 5,
    title: "Item 5",
    description: "Description for Item 5",
    created: "22 Feb 2024",
    questions: "4",
    response: "14",
    updated: "14 Enero 2024"
  },
  {
    id: 6,
    title: "Item 6",
    description: "Description for Item 6",
    created: "22 Feb 2024",
    questions: "4",
    response: "14",
    updated: "14 Enero 2024"
  },
  {
    id: 7,
    title: "Item 7",
    description: "Description for Item 7",
    created: "22 Feb 2024",
    questions: "4",
    response: "14",
    updated: "14 Enero 2024"
  },
  {
    id: 8,
    title: "Item 8",
    description: "Description for Item 8",
    created: "22 Feb 2024",
    questions: "4",
    response: "14",
    updated: "14 Enero 2024"
  },
  {
    id: 9,
    title: "Item 9",
    description: "Description for Item 9",
    created: "22 Feb 2024",
    questions: "4",
    response: "14",
    updated: "14 Enero 2024"
  },
  {
    id: 10,
    title: "Item 10",
    description: "Description for Item 10",
    created: "22 Feb 2024",
    questions: "4",
    response: "14",
    updated: "14 Enero 2024"
  },
  {
    id: 11,
    title: "Item 11",
    description: "Description for Item 11",
    created: "22 Feb 2024",
    questions: "4",
    response: "14",
    updated: "14 Enero 2024"
  },
  {
    id: 12,
    title: "Item 12",
    description: "Description for Item 12",
    created: "22 Feb 2024",
    questions: "4",
    response: "14",
    updated: "14 Enero 2024"
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
      {alignment == "Grid" ? (
        <GridView data={data} />
      ) : (
        <ListView data={data} />
      )}
    </main>
  );
}
