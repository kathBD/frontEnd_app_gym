
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/DashboardAdmin.css";

const DashboardAdmin = () => {
  return (
    <div>
      <div className="welcome-section">
        <h2>Bienvenido, Administrador</h2>
        <p className="subtitle">Panel principal del sistema VibraFit</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card-kpi">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-lines-fill me-3"></i>
              <div>
                <h6>Usuarios Registrados</h6>
                <h4>125</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-kpi">
            <div className="d-flex align-items-center">
              <i className="bi bi-card-checklist me-3"></i>
              <div>
                <h6>Membresías Activas</h6>
                <h4>48</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-kpi">
            <div className="d-flex align-items-center">
              <i className="bi bi-bell-fill me-3"></i>
              <div>
                <h6>Notificaciones Nuevas</h6>
                <h4>7</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

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
  );
};

export default DashboardAdmin;




