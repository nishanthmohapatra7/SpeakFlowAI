import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api/auth';
  axios.defaults.withCredentials = true;

  const login = async (email, password) => {
    const { data } = await axios.post(`${API_URL}/login`, { email, password });
    setUser(data);
    return data;
  };

  const register = async (username, email, password) => {
    const { data } = await axios.post(`${API_URL}/register`, { username, email, password });
    setUser(data);
    return data;
  };

  const logout = async () => {
    await axios.post(`${API_URL}/logout`);
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      // In a real app, I'd have a /me or /profile endpoint to verify cookie
      // For now, I'll use a placeholder or check localStorage if I were using it
      // But we use HTTP-only cookies, so the backend handles verification.
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
