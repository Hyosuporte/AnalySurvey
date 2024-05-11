import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export function ButtonsLogin() {
  return (
    <Container>
      <div>
        <Button
          component={Link}
          to="/login"
          className="link"
          sx={{
            border: "1px solid var(--Color-2, #865DFF)",
            padding: "6px",
          }}
          aria-label="Login/Sign Up"
        >
          Login/Sign Up
        </Button>
        <Button
          className="button"
          variant="contained"
          component={Link}
          sx={{ ml: 2 }}
          aria-label="Comenzar Encuesta"
          to="/login"
        >
          Comenzar Encuesta
        </Button>
      </div>
    </Container>
  );
}
