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
            mr: 3,
            border: "1px solid var(--Color-2, #865DFF)",
          }}
        >
          Log In/Sign Up
        </Button>
        <Button
          className="button"
          variant="contained"
          component={Link}
          to="/login"
        >
          Comenzar Encuesta
        </Button>
      </div>
    </Container>
  );
}
