import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export function NavbarLandig() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        marginBottom: "1.5rem",
      }}
    >
      <Toolbar>
        <ul>
          <li>
            <Link href="/">
              <Typography variant="h6">Analy Survey</Typography>
            </Link>
          </li>
          <li>
            <a href="#CardList">Funciones</a>
          </li>
          <li>
            <a href="#CaruselTemplate">Plantillas</a>
          </li>
          <li>
            <a href="/#footerLandi">Acerca de</a>
          </li>
          <li>
            <a href="#MainLandi">Inicio</a>
          </li>
        </ul>
        <ul className="navbar-btnLand">
          <li>
            <Link to="profile">
              <Button
                variant="contained"
                size="medium"
                sx={{
                  backgroundColor: "#865DFF",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#6340D1",
                  },
                  "&:active": {
                    backgroundColor: "#4A29A6",
                  },
                  padding: "1rem",
                }}
              >
                Comenzar Encuesta
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <Button
                variant="outlined"
                sx={{
                  padding: "1rem",
                  color: "white",
                  border: "1px solid #865dff",
                }}
              >
                Log in/Sign Up
              </Button>
            </Link>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
}
