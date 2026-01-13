// context/AuthContext.js - VERSIÓN ACTUALIZADA
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔍 AuthProvider - Cargando usuario de localStorage");
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("✅ Usuario cargado de localStorage:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('❌ Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    } else {
      console.log("ℹ️ No hay usuario en localStorage");
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    console.log("🔐 AuthProvider - Login llamado con:", userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log("✅ Usuario guardado en localStorage");
  };

  const logout = () => {
    console.log("🚪 AuthProvider - Logout llamado");
    setUser(null);
    localStorage.removeItem('user');
    console.log("✅ Usuario eliminado de localStorage");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }

  return context;
};

export default AuthContext;
