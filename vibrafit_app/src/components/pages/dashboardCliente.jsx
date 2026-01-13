// components/pages/dashboardCliente.jsx - CON SIDEBAR
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar"; 
import AuthContext from "../../context/AuthContext";
import "../../assets/styles/DashboardAdmin.css"; 

const DashboardCliente = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      {/* SIDEBAR PARA CLIENTE */}
      <Sidebar rol={user?.rol || "Cliente"} onLogout={handleLogout} />
      
      {/* CONTENIDO PRINCIPAL */}
      <div className="main-content">
        <div className="content-background">
          <div className="welcome">
            <h2 className="text-white">¡Bienvenido, {user?.nombre || 'Cliente'}!</h2>
            <p className="text-muted-white">Aquí puedes acceder a tus rutinas, progreso y planes.</p>
          </div>

          {/* Resto de tu código... */}
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
            {/* ... tus botones ... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCliente;


