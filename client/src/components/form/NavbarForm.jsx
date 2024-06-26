import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { MenuUser } from "../MenuUser";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

export function NavbarForm({ formId }) {
  const urlEdit = `/survey/create/${formId}`;
  const urlRes = `/survey/analysis/${formId}`;
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
          <Link className="link-navEdi" href={urlEdit}>
            Preguntas
          </Link>
          <Link className="link-navEdi" href={urlRes}>
            Respuestas
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <MenuUser />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
