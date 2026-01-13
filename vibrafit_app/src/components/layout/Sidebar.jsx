import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importa useAuth
import '../../assets/styles/Sidebar.css'; 

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Obtiene user y logout del contexto
  
  // Determina userType basado en el rol del usuario
  const userType = user?.rol?.nombre?.toLowerCase() || 'admin';
  
  // Configuración según tipo de usuario
  const menuItems = {
    administrador: [
      { path: '/admin', icon: 'bi-house-door-fill', label: 'Inicio' },
      { path: '/usuarios', icon: 'bi-people-fill', label: 'Gestión de Usuarios' },
      { path: '/admin/notificaciones', icon: 'bi-bell-fill', label: 'Notificaciones' },
      { path: '/admin/membresias', icon: 'bi-card-checklist', label: 'Membresías' },
    ],
    cliente: [
      { path: '/cliente', icon: 'bi-house-door-fill', label: 'Inicio' },
      { path: '/cliente/rutinas', icon: 'bi-calendar-check', label: 'Mis Rutinas' },
      { path: '/cliente/estadisticas', icon: 'bi-graph-up', label: 'Estadísticas' },
      { path: '/cliente/perfil', icon: 'bi-person-circle', label: 'Mi Perfil' },
    ],
    entrenador: [
      { path: '/entrenador', icon: 'bi-house-door-fill', label: 'Inicio' },
      { path: '/entrenador/clientes', icon: 'bi-people-fill', label: 'Mis Clientes' },
      { path: '/entrenador/rutinas', icon: 'bi-clipboard-plus', label: 'Crear Rutinas' },
      { path: '/entrenador/calendario', icon: 'bi-calendar-week', label: 'Calendario' },
    ]
  };

  const handleLogout = () => {
    logout(); // Usa logout del contexto
    navigate('/login');
  };

  // Verifica que haya menú para el userType
  const currentMenu = menuItems[userType] || menuItems.administrador;

  return (
    <div className="sidebar">
      <div className="text-center mb-4">
      
        <h5 className="mt-2 sidebar-title">
          {userType === 'administrador' ? 'VibraFit Admin' : 
           userType === 'cliente' ? 'Mi Espacio' : 
           'Panel Entrenador'}
        </h5>
        {user && (
          <div className="user-info">
            <p className="mb-0"><strong>{user.nombre}</strong></p>
            <small>{user.correo}</small>
          </div>
        )}
      </div>
      
      {/* Menú dinámico según rol */}
      {currentMenu.map((item) => (
        <NavLink 
          key={item.path}
          to={item.path}
          className={({ isActive }) => 
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          end
        >
          <i className={`bi ${item.icon} me-2`}></i>
          {item.label}
        </NavLink>
      ))}
      
      {/* Botón de logout */}
      <div className="mt-4 px-3">
        <button 
          onClick={handleLogout}
          className="btn btn-outline-light w-100 logout-btn"
        >
          <i className="bi bi-box-arrow-right me-1"></i> 
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
