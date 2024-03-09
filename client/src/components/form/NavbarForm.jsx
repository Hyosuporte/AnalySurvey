import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MenuUser } from "../MenuUser";

export function NavbarForm() {
  return (
    <AppBar position="static" sx={{ background: "#191825" }}>
      <Container className="container-nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "#865DFF",
            }}
          >
            Analy Survey
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <MenuUser />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
