import { useAuth } from "../../context/AuthContext";
import { NavButtonLogin } from "./NavButtonLogin";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import { MenuUser } from "../MenuUser";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import { MenuNav } from "./MenuNav";

const pages = [
  {
    title: "Funciones",
    href: "#CardList",
  },
  { title: "Plantillas", href: "#CaruselTemplate" },
  { title: "Acerca de", href: "#footerLandi" },
  { title: "Inicio", href: "#home" },
];

export function NavbarLandig() {
  const { isAuthenticated } = useAuth();

  return (
    <AppBar
      position="static"
      sx={{
        background: "#191825",
      }}
    >
      <Container className="container-nav">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontWeight: 600,
              letterSpacing: ".2rem",
              color: "#865DFF",
            }}
          >
            Analy Survey
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <MenuNav pages={pages} />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "#865DFF",
            }}
          >
            Analy Survey
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button key={page.title} className="button-white">
                <Link href={page.href} className="link">
                  {page.title}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated == true ? <MenuUser /> : <NavButtonLogin />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
