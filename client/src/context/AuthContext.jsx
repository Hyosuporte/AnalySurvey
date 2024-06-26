/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from "react";
import { login, register, verify } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    let timer;
    if (errors.length > 0) {
      timer = setTimeout(() => {
        setErrors([]);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await verify(token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
          return;
        }
        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
        setErrors((prevErrors) => [...prevErrors, error]);
      }
    };

    checkLogin();
  }, []);

  const singUp = async (user) => {
    try {
      const res = await register(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
      window.localStorage.setItem("token", res.data.token);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const singIn = async (user) => {
    try {
      const res = await login(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
      window.localStorage.setItem("token", res.data.token);
    } catch (error) {
      if (error.response.data.detail != undefined) {
        setErrors(["Usuario o contraseña invalidos"]);
      } else {
        setErrors(error.response.data);
      }
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    window.localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        singUp,
        singIn,
        logout,
        user,
        isAuthenticated,
        errors,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
