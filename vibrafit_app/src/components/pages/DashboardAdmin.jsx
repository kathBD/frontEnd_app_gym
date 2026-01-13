import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import AuthContext from "../../context/AuthContext";
import "../../assets/styles/DashboardAdmin.css";
import DashboardLayout from "../layout/DashboardLayout";

const DashboardAdmin = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <Sidebar rol={user?.rol || "Administrador"} onLogout={handleLogout} />
      
      {/* CONTENIDO PRINCIPAL CON FONDO CLARO */}
      <div className="main-content">
        {/* CONTENEDOR CON FONDO DE IMAGEN */}
        <div className="content-background">
          <div className="welcome">
            <h2 className="text-white">Bienvenido, Administrador</h2>
            <p className="text-muted-white">Panel principal del sistema VibraFit</p>
          </div>

          <div className="row g-4">
            {/* KPI Usuarios */}
            <div className="col-md-4">
              <div className="card-kpi">
                <div className="d-flex align-items-center">
                  <div className="icon">
                    <i className="bi bi-person-lines-fill"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Usuarios Registrados</h6>
                    <h4>125</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI Membresías */}
            <div className="col-md-4">
              <div className="card-kpi">
                <div className="d-flex align-items-center">
                  <div className="icon">
                    <i className="bi bi-card-checklist"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Membresías Activas</h6>
                    <h4>48</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI Notificaciones */}
            <div className="col-md-4">
              <div className="card-kpi">
                <div className="d-flex align-items-center">
                  <div className="icon">
                    <i className="bi bi-bell-fill"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Notificaciones Nuevas</h6>
                    <h4>7</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accesos rápidos */}
          <div className="row mt-5 g-4">
            <div className="col-md-4">
              <Link to="/usuarios" className="btn btn-outline-primary w-100 py-3">
                <i className="bi bi-person-gear me-2"></i>Gestionar Usuarios
              </Link>
            </div>
            <div className="col-md-4">
              <button className="btn btn-outline-success w-100 py-3">
                <i className="bi bi-envelope-open me-2"></i>Ver Notificaciones
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-outline-warning w-100 py-3">
                <i className="bi bi-cash-coin me-2"></i>Gestionar Membresías
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;


