import { useState } from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { FormRegist } from "../components/auth/FormRegist";
import { FormLogin } from "../components/auth/FormLogin";

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
          height: "calc(100vh - 10%)",
        }}
      >
        <Box className="login-container-forms">
          <Navbar onOptionClick={handleOptionClick} />
          {ShowComponent === "FormLogin" && <FormLogin />}
          {ShowComponent === "FormRegist" && <FormRegist />}
        </Box>
      </Box>
    </main>
  );
}
