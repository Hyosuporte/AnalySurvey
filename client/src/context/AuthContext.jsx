/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from "react";
import { login, register, verify, activeCount } from "../api/auth";

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
  const [pending, setPending] = useState(null);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleSuccessfulLogin = (res) => {
    setUser(res.data);
    setIsAuthenticated(true);
    window.localStorage.setItem("token", res.data.token);
    setLoading(false);
    if (pending) {
      pending();
      setPending(null);
    }
  };

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

  const signUp = async (user) => {
    try {
      const res = await register(user);
      return res.status === 201 && true;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signIn = async (user, token) => {
    try {
      const res = await login(user, token);
      handleSuccessfulLogin(res);
    } catch (error) {
      if (error.response.data.detail != undefined) {
        console.log(error)
        setErrors(["Usuario o contraseña invalidos"]);
      } else {
        console.log(error)
        setErrors(error.response.data);
      }
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    window.localStorage.removeItem("token");
  };

  const codeAuth = async (code) => {
    try {
      const res = await activeCount(code);
      handleSuccessfulLogin(res);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logout,
        user,
        isAuthenticated,
        errors,
        isLoading,
        pending,
        setPending,
        codeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
