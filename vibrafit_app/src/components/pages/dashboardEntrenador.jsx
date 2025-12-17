// src/components/pages/trainer/DashboardTrainer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/DashboardAdmin.css"; // Reutilizamos estilos

const DashboardEntrenador  = () => {
  return (
    <div>
      <div className="welcome-section">
        <h2>¡Bienvenido, Entrenador!</h2>
        <p className="subtitle">Gestiona rutinas, clientes y estadísticas de tu gimnasio.</p>
      </div>

      <div className="row g-4 mb-4">
        {/* Rutinas */}
        <div className="col-md-4">
          <div className="card-kpi bg-primary text-white">
            <div className="d-flex align-items-center">
              <i className="bi bi-list-check me-3"></i>
              <div>
                <h6>Rutinas</h6>
                <h4>12</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Clientes */}
        <div className="col-md-4">
          <div className="card-kpi bg-dark text-white">
            <div className="d-flex align-items-center">
              <i className="bi bi-people-fill me-3"></i>
              <div>
                <h6>Mis Clientes</h6>
                <h4>30</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="col-md-4">
          <div className="card-kpi bg-warning text-dark">
            <div className="d-flex align-items-center">
              <i className="bi bi-bar-chart-fill me-3"></i>
              <div>
                <h6>Estadísticas</h6>
                <h4>5 KPIs</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 g-4">
        <div className="col-md-4">
          <Link to="/trainer/rutinas" className="btn btn-outline-primary w-100 py-3">
            <i className="bi bi-list-check me-2"></i>Gestionar Rutinas
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/trainer/clientes" className="btn btn-outline-success w-100 py-3">
            <i className="bi bi-people-fill me-2"></i>Ver Clientes
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/trainer/estadisticas" className="btn btn-outline-warning w-100 py-3">
            <i className="bi bi-bar-chart-fill me-2"></i>Ver Estadísticas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardEntrenador;

