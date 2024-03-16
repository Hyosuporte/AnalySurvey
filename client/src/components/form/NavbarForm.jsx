import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { MenuUser } from "../MenuUser";

import Box from "@mui/material/Box";

export function NavbarForm({ title }) {
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
          /
          <TextField
            type="text"
            size="small"
            variant="filled"
            color="secondary"
            sx={{
              marginBottom: ".9rem",
              background: "red",
            }}
            defaultValue={title}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <MenuUser />
        </Toolbar>
      </Container>
    </AppBar>
  );
}