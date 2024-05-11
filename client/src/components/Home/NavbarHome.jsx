import { useAuth } from "../../context/AuthContext";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ButtonsLogin } from "./ButtonsLogin";
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
  { title: "Inicio", href: "#home" },
];

export function NavbarHome() {
  const { isAuthenticated, isLoading } = useAuth();

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
            variant="h5"
            noWrap
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontWeight: 600,
              color: "#865DFF",
            }}
          >
            Analy Survey
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <MenuNav pages={pages} />
          </Box>
          <Typography
            className="title-home"
            variant="h4"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "#865DFF",
            }}
          >
            Analy Survey
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                className="button-white"
                aria-label={page.title}
              >
                <Link href={page.href} className="link">
                  {page.title}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLoading ? null : isAuthenticated ? (
              <MenuUser />
            ) : (
              <ButtonsLogin />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
