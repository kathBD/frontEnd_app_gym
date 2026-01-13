// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Mientras carga
  if (loading) {
    return <div className="text-center mt-5">Cargando...</div>;
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si se requiere un rol específico, verificar
  if (requiredRole && user?.rol !== requiredRole) {
    // Redirigir al dashboard correspondiente
    switch (user?.rol) {
      case 'Administrador':
        return <Navigate to="/admin" />;
      case 'Cliente':
        return <Navigate to="/cliente" />;
      case 'Entrenador':
        return <Navigate to="/entrenador" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute;