import { Link, useNavigate, useLocation } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { FormRegist } from "../components/auth/FormRegist";
import { CodeEmail } from "../components/auth/CodeEmail";
import { FormLogin } from "../components/auth/FormLogin";
import { useAuth } from "../context/AuthContext";
import { Loading } from "../components/Loading";
import { useState, useEffect } from "react";

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
          aria-label="login"
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
          aria-label="register"
        >
          Registrarse
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default function SignIn() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [ShowComponent, setShowComponent] = useState("FormLogin");
  const [redirect] = useState(location.state?.from || "/dashboard");
  const [isChecking, setIsChecking] = useState(true);

  const handleOptionClick = (component) => {
    setShowComponent(component);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
    setIsChecking(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isChecking) return <Loading />;

  return (
    <main className="login-body">
      <Box position="fixed" width="fit-content" top="2.5rem" left="3.5rem">
        <Link to="/">
          <Button
            className="button-black"
            aria-label="volver al inicio"
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
