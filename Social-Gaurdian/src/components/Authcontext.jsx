// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const AuthContext = createContext();

// Hook for easy usage
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authtoken"));

  const login = (token) => {
    localStorage.setItem("authtoken", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("authtoken");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // In case token is manually changed
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("authtoken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
