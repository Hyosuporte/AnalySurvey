import { createContext, useContext, useState, useEffect } from "react";
import { login, register } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const singUp = async (user) => {
    try {
      const res = await register(user);
      setUser(res.data);
      setIsAuthenticated(true);
      console.log(res.data);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const singIn = async (user) => {
    try {
      const res = await login(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response.data.detail != undefined) {
        setErrors(["Usuario o contraseña invalidos"]);
      } else {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ singUp, singIn, user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
