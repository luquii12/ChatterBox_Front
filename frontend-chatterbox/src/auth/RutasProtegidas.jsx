import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './AuthProvider';

const RutaProtegida = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default RutaProtegida;
