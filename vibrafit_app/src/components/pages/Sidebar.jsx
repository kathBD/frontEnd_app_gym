// components/pages/Sidebar.jsx - VERSIÓN DINÁMICA
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Sidebar.css";

const Sidebar = ({ rol, onLogout }) => {
  // Obtener enlaces según el rol
  const getMenuItems = () => {
    const baseItems = [
      { to: "/", icon: "fas fa-home", label: "Inicio" },
    ];

    switch (rol) {
      case "Administrador":
        return [
          ...baseItems,
          { to: "/admin", icon: "fas fa-tachometer-alt", label: "Dashboard" },
          { to: "/usuarios", icon: "fas fa-users", label: "Usuarios" },
          { to: "/admin/reportes", icon: "fas fa-chart-bar", label: "Reportes" },
          { to: "/admin/config", icon: "fas fa-cog", label: "Configuración" },
        ];
      
      case "Entrenador":
        return [
          ...baseItems,
          { to: "/entrenador", icon: "fas fa-tachometer-alt", label: "Dashboard" },
          { to: "/trainer/clientes", icon: "fas fa-user-friends", label: "Mis Clientes" },
          { to: "/trainer/rutinas", icon: "fas fa-dumbbell", label: "Rutinas" },
          { to: "/trainer/horarios", icon: "fas fa-calendar-alt", label: "Horarios" },
        ];
      
      case "Cliente":
      default:
        return [
          ...baseItems,
          { to: "/cliente", icon: "fas fa-tachometer-alt", label: "Dashboard" },
          { to: "/client/rutinas", icon: "fas fa-dumbbell", label: "Mis Rutinas" },
          { to: "/client/progreso", icon: "fas fa-chart-line", label: "Mi Progreso" },
          { to: "/client/perfil", icon: "fas fa-user-circle", label: "Mi Perfil" },
          { to: "/client/planes", icon: "fas fa-cash-coin", label: "Mis Planes" },
        ];
    }
  };

  return (
    <div className="sidebar">
   
      <div className="sidebar-menu">
        {getMenuItems().map((item, index) => (
          <Link 
            key={index} 
            to={item.to} 
            className="sidebar-item"
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      
      <div className="sidebar-footer">
        <button onClick={onLogout} className="btn-logout-sidebar">
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;