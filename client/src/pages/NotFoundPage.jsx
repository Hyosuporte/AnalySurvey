import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import imgNotFound from "../assets/image/notfound.png";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <Box position="fixed" width="fit-content" top="2.5rem" left="4rem">
        <Link to="/">
          <Button className="button-black" startIcon={<ArrowBackIosIcon className="icon-black" />}>
            Home
          </Button>
        </Link>
      </Box>

      <Box textAlign="center">
        <Typography
          variant="h5"
          sx={{
            display: "grid",
            justifyContent: "center",
            position: "relative",
            top: "30vw",
            color: "black",
          }}
        >
          Ooop.. Page not found
        </Typography>
        <img className="img" src={imgNotFound} alt="404 not found" />
      </Box>
    </main>
  );
}
