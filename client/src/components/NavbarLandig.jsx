import { AppBar, Toolbar, Typography, Button, Grid, Link } from "@mui/material";

export function NavbarLandig() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        marginBottom: "2rem",
      }}
    >
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <ul className="navbar-landi">
              <li>
                <Typography variant="h5" sx={{ fontFamily: "poppins" }}>
                  Analy Survey
                </Typography>
              </li>
              <li>
                <Link
                  href="#CardList"
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: "white",
                      textDecoration: "none",
                    },
                  }}
                >
                  Funciones
                </Link>
              </li>
              <li>
                <Link
                  href="#CaruselTemplate"
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: "white",
                      textDecoration: "none",
                    },
                  }}
                >
                  Plantillas
                </Link>
              </li>
              <li>
                <Link
                  href="#footerLandi"
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: "white",
                      textDecoration: "none",
                    },
                  }}
                >
                  Acerca de
                </Link>
              </li>
              <li>
                <Link
                  href="#MainLandi"
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: "white",
                      textDecoration: "none",
                    },
                  }}
                >
                  Inicio
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item>
            <ul>
              <li>
                <Link href="/login">
                  <Button
                    variant="outlined"
                    sx={{
                      padding: "1rem",
                      border: "2px solid #865DFF",
                      color: "white",
                      "&:hover": {
                        border: "2px solid #865DFF",
                      },
                    }}
                  >
                    Log in/Sign Up
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <Button
                    variant="contained"
                    sx={{
                      padding: "1rem",
                      backgroundColor: "#865DFF",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "#865DFF",
                      },
                    }}
                  >
                    Comenzar Encuesta
                  </Button>
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
