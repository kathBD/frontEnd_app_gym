
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/DashboardAdmin.css"; 

const DashboardCliente = () => {
  return (
    <div>
      <div className="welcome-section">
        <h2>¡Bienvenido, Cliente!</h2>
        <p className="subtitle">Aquí puedes acceder a tus rutinas, progreso y planes.</p>
      </div>

      <div className="row g-4 mb-4">
        {/* Rutinas */}
        <div className="col-md-4">
          <div className="card-kpi bg-primary text-white">
            <div className="d-flex align-items-center">
              <i className="bi bi-list-check me-3"></i>
              <div>
                <h6>Mis Rutinas</h6>
                <h4>5</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Progreso */}
        <div className="col-md-4">
          <div className="card-kpi bg-dark text-white">
            <div className="d-flex align-items-center">
              <i className="bi bi-graph-up me-3"></i>
              <div>
                <h6>Mi Progreso</h6>
                <h4>80%</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Planes */}
        <div className="col-md-4">
          <div className="card-kpi bg-warning text-dark">
            <div className="d-flex align-items-center">
              <i className="bi bi-cash-coin me-3"></i>
              <div>
                <h6>Mis Planes</h6>
                <h4>2</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 g-4">
        <div className="col-md-4">
          <Link to="/client/rutinas" className="btn btn-outline-primary w-100 py-3">
            <i className="bi bi-list-check me-2"></i>Ver Rutinas
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/client/progreso" className="btn btn-outline-success w-100 py-3">
            <i className="bi bi-graph-up me-2"></i>Ver Progreso
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/client/planes" className="btn btn-outline-warning w-100 py-3">
            <i className="bi bi-cash-coin me-2"></i>Ver Planes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardCliente;


