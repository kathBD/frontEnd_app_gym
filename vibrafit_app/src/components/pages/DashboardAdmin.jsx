// src/components/pages/DashboardAdmin.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/DashboardAdmin.css';

const DashboardAdmin = () => {
  const navigate = useNavigate();

  /**
   * Maneja el cierre de sesión
   */
  const handleLogout = () => {
    // Aquí iría la lógica de logout
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div className="dashboard-admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="text-center mb-4">
          <img 
            src="/img/logo.jpg" 
            alt="Logo VibraFit" 
            className="sidebar-logo"
          />
          <h5 className="mt-2">VibraFit Admin</h5>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link">
            <i className="bi bi-house-door-fill me-2"></i>
            Inicio
          </Link>
          <Link to="/usuarios" className="sidebar-link">
            <i className="bi bi-people-fill me-2"></i>
            Gestión de Usuarios
          </Link>
          <Link to="#" className="sidebar-link">
            <i className="bi bi-bell-fill me-2"></i>
            Notificaciones
          </Link>
          <Link to="#" className="sidebar-link">
            <i className="bi bi-card-checklist me-2"></i>
            Membresías
          </Link>
          
          {/* Botón de cerrar sesión */}
          <div className="logout-section mt-4 px-3">
            <button 
              className="btn btn-outline-light w-100"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Cerrar sesión
            </button>
          </div>
        </nav>
      </div>

      {/* Contenido Principal */}
      <div className="main-content">
        <div className="welcome-section">
          <h2>Bienvenido, Administrador</h2>
          <p className="subtitle">Panel principal del sistema VibraFit</p>
        </div>

        {/* KPI Cards */}
        <div className="row g-4 mb-4">
          {/* KPI Usuarios */}
          <div className="col-md-4">
            <div className="card-kpi">
              <div className="d-flex align-items-center">
                <div className="icon me-3">
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
                <div className="icon me-3">
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
                <div className="icon me-3">
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
              <i className="bi bi-person-gear me-2"></i>
              Gestionar Usuarios
            </Link>
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-success w-100 py-3">
              <i className="bi bi-envelope-open me-2"></i>
              Ver Notificaciones
            </button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-warning w-100 py-3">
              <i className="bi bi-cash-coin me-2"></i>
              Gestionar Membresías
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;



