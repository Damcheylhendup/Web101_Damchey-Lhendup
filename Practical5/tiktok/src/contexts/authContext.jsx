"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api-config";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        setUser(decoded);
        setToken(savedToken);
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const newToken = res.data.token;

    localStorage.setItem("token", newToken);
    setToken(newToken);

    const decoded = jwtDecode(newToken);
    setUser(decoded);

    return res.data;
  };

  const register = async (username, email, password) => {
    const res = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);