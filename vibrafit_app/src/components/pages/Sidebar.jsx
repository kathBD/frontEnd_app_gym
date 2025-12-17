import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";

const Sidebar = ({ rol }) => {
  const menuItems = {
    Administrador: [
      { to: "/admin", label: "Inicio", icon: "bi-house-door-fill" },
      { to: "/usuarios", label: "Usuarios", icon: "bi-people-fill" },
      { to: "#", label: "Notificaciones", icon: "bi-bell-fill" },
      { to: "#", label: "Membresías", icon: "bi-card-checklist" },
    ],
    Entrenador: [
      { to: "/trainer", label: "Inicio", icon: "bi-house-door-fill" },
      { to: "/trainer/clientes", label: "Clientes", icon: "bi-people-fill" },
      { to: "#", label: "Notificaciones", icon: "bi-bell-fill" },
    ],
    Cliente: [
      { to: "/client", label: "Inicio", icon: "bi-house-door-fill" },
      { to: "/client/mis-clases", label: "Mis Clases", icon: "bi-calendar-event" },
      { to: "#", label: "Notificaciones", icon: "bi-bell-fill" },
    ],
  };

  return (
    <aside className="sidebar">
      <div className="text-center mb-4">
        <img src={logo} className="sidebar-logo" width={70} alt="logo" />
        <h5>VibraFit {rol}</h5>
      </div>
      {menuItems[rol]?.map((item) => (
        <Link key={item.to} to={item.to} className="sidebar-link">
          <i className={`bi ${item.icon} me-2`}></i>
          {item.label}
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
