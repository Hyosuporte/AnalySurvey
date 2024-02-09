import { useState } from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { FormRegist } from "../components/FormRegist";
import { FormLogin } from "../components/FormLogin";

// eslint-disable-next-line react/prop-types
function Navbar({ onOptionClick }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#865dff",
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
            fontFamily: "Poppins",
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
            fontFamily: "Poppins",
          }}
        >
          Registrarse
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export function Login() {
  const [ShowComponent, setShowComponent] = useState("FormLogin");

  const handleOptionClick = (component) => {
    setShowComponent(component);
  };

  return (
    <main className="login-body">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            width: "35%",
            minHeight: "35vh",
            backgroundColor: "#cccccc",
            border: "3px solid #865dff",
            borderRadius: "15px 15px 15px 15px",
          }}
        >
          <Navbar onOptionClick={handleOptionClick} />
          {ShowComponent === "FormLogin" && <FormLogin />}
          {ShowComponent === "FormRegist" && <FormRegist />}
        </Box>
      </Box>
    </main>
  );
}
