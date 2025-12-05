import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";
import "../../assets/styles/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <div className="text-center mb-4">
        <img src={logo} className="logo" width={70} alt="logo" />
        <h5>VibraFit Admin</h5>
      </div>

      <Link to="/admin"><i className="bi bi-house-door-fill me-2"></i>Inicio</Link>
      <Link to="/usuarios"><i className="bi bi-people-fill me-2"></i>Usuarios</Link>
      <Link to="/notificaciones"><i className="bi bi-bell-fill me-2"></i>Notificaciones</Link>
      <Link to="/membresias"><i className="bi bi-card-checklist me-2"></i>Membresías</Link>

    </aside>
  );
};

export default Sidebar;
