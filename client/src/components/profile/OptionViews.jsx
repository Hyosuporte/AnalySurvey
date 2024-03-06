import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import GridViewIcon from "@mui/icons-material/GridView";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useState } from "react";

export function OptionViews({ setAligment }) {
  const [inputValue, setInputValue] = useState("Grid");

  const handleChange = (event, newAlignment) => {
    setInputValue(newAlignment);
    setAligment(newAlignment);
  };

  return (
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
            <Link className="link" to="/profile/:id/createform">
              Crear Encuesta
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            value={inputValue}
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
  );
}
