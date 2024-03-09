import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";

export function NavButtonLogin() {
  return (
    <Container>
      <div>
        <Button
          sx={{
            mr: 3,
            border: "1px solid var(--Color-2, #865DFF)",
            "&: hover": {
              background: "#865DFF",
            },
          }}
        >
          <Link className="link" href="/login">
            Log In/Sing Up
          </Link>
        </Button>
        <Button className="button" variant="contained">
          <Link className="link" href="/login">
            Comenzar Encuesta
          </Link>
        </Button>
      </div>
    </Container>
  );
}
