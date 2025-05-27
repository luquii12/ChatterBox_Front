import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './AuthProvider';
import isTokenExpired from './IsTokenExpired';
const RutaProtegida = ({ children }) => {
  const { user ,logout} = useAuth();
  if (user && user.token) {
    const token = user.token;
    if (isTokenExpired(token)) {
logout()
      // Si el token ha expirado, redirigir al usuario a la página de inicio de sesión
      return <Navigate to="/login" />;
    }
  }
  return user ? children : <Navigate to="/login" />;
};

export default RutaProtegida;
