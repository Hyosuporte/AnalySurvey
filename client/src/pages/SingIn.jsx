import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { FormRegist } from "../components/auth/FormRegist";
import { FormLogin } from "../components/auth/FormLogin";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CodeEmail } from "../components/auth/CodeEmail";

function Navbar({ onOptionClick }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#794dff",
        borderRadius: "10px 10px 0 0",
        marginBottom: "2rem",
      }}
    >
      <Toolbar>
        <Button
          color="inherit"
          onClick={() => onOptionClick("FormLogin")}
          sx={{
            marginRight: "2rem",
            marginLeft: "2rem",
          }}
        >
          Iniciar Sesión
        </Button>
        <Button
          color="inherit"
          onClick={() => onOptionClick("FormRegist")}
          sx={{
            marginRight: "2rem",
            marginLeft: "2rem",
          }}
        >
          Registrarse
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default function SingIn() {
  const [ShowComponent, setShowComponent] = useState("CodeEmail");

  const handleOptionClick = (component) => {
    setShowComponent(component);
  };

  return (
    <main className="login-body">
      <Box position="fixed" width="fit-content" top="2.5rem" left="4rem">
        <Link to="/">
          <Button
            className="button-black"
            startIcon={<ArrowBackIosIcon className="icon-black" />}
          >
            Home
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 10%)",
        }}
      >
        <Box className="login-container-forms">
          <Navbar onOptionClick={handleOptionClick} />
          {ShowComponent === "FormLogin" && <FormLogin />}
          {ShowComponent === "FormRegist" && (
            <FormRegist setShowComponent={setShowComponent} />
          )}
          {ShowComponent === "CodeEmail" && <CodeEmail />}
        </Box>
      </Box>
    </main>
  );
}
