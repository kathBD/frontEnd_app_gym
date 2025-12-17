import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";

const Sidebar = ({ rol, onLogout }) => {
  const menuItems = {
    Administrador: [
      { to: "/admin", label: "Inicio", icon: "bi-house-door-fill" },
      { to: "/usuarios", label: "Usuarios", icon: "bi-people-fill" },
      { to: "#", label: "Notificaciones", icon: "bi-bell-fill" },
      { to: "#", label: "Membresías", icon: "bi-card-checklist" },
    ],
    Entrenador: [
      { to: "/trainer", label: "Inicio", icon: "bi-house-door-fill" },
    ],
    Cliente: [
      { to: "/client", label: "Inicio", icon: "bi-house-door-fill" },
    ],
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header text-center">
        <img src={logo} className="sidebar-logo" alt="logo" />
        <h5>VibraFit {rol}</h5>
      </div>

      <nav className="sidebar-nav">
        {menuItems[rol]?.map((item) => (
          <NavLink key={item.to} to={item.to} className="sidebar-link">
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="logout-section px-3">
        <button className="btn btn-outline-light w-100" onClick={onLogout}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;


