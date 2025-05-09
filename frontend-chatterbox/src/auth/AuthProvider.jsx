import React, { createContext, useContext, useState } from 'react';
import useStorageState from '../services/Storage/UseStorageState';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useStorageState("user",null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
