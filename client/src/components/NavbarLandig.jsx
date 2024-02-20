import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "@mui/material";

const pages = [
  {
    title: "Funciones",
    href: "#CardList",
  },
  { title: "Plantillas", href: "#CaruselTemplate" },
  { title: "Acerca de", href: "#footerLandi" },
  { title: "Inicio", href: "#home" },
];
const settings = ["Perfil", "Dashboard", "Cerrar Sesion"];

export function NavbarLandig() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userSesion, SetUserSesion] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  React.useEffect(() => {
    const session = JSON.parse(window.sessionStorage.getItem("session"));
    if (session && session.usuario) {
      SetUserSesion(true);
    }
  }, []);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#191825",
      }}
    >
      <Container maxWidth="xl">
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
              textDecoration: "none",
            }}
          >
            Analy Survey
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
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
              textDecoration: "none",
            }}
          >
            Analy Survey
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                <Link
                  href={page.href}
                  sx={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  {page.title}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {userSesion ? (
              <Container>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Container>
            ) : (
              <Container>
                <div>
                  <Button
                    sx={{
                      mr: 3,
                      color: "white",
                      border: "1px solid var(--Color-2, #865DFF)",
                    }}
                  >
                    <Link
                      href="/login"
                      sx={{
                        color: "white",
                        textDecoration: "none",
                      }}
                    >
                      Log In/Sing Up
                    </Link>
                  </Button>
                  <Button
                    sx={{
                      color: "white",
                      background: "#865DFF",
                      "&:hover": {
                        backgroundColor: "#8c66ff",
                        borderColor: "#0062cc",
                        boxShadow: "none",
                      },
                    }}
                    variant="contained"
                  >
                    <Link
                      href="/login"
                      sx={{
                        color: "white",
                        textDecoration: "none",
                      }}
                    >
                      Comenzar Encuesta
                    </Link>
                  </Button>
                </div>
              </Container>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
