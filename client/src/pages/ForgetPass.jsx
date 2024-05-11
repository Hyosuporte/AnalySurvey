import { FormPassw } from "../components/auth/FormPassw";
import { useAuth } from "../context/AuthContext";
import { Loading } from "../components/Loading";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

export default function ForgetPass() {
  const { isAuthenticated } = useAuth();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsChecking(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isChecking) return <Loading />;

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
          <FormPassw />
        </Box>
      </Box>
    </main>
  );
}
