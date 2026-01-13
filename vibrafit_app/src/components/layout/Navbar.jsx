
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/img/logo.jpg';
import '../../assets/styles/Navbar.css';


const Navbar = () => {
  // Hooks de React Router
  const navigate = useNavigate();
  const location = useLocation();
  
  // Estado para simular autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Verifica autenticación al cargar
   */
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const { isAuthenticated: auth, role } = JSON.parse(userData);
      setIsAuthenticated(auth);
      setUserRole(role);
    }
  }, []);

  /**
   * Efecto para navbar al hacer scroll
   */
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar-custom');
      if (navbar && window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else if (navbar) {
        navbar.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Maneja el cierre de sesión
   */
  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserRole(null);
    setIsMenuOpen(false);
    navigate('/login');
  };

  /**
   * Alterna el menú móvil
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Cierra el menú móvil
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  /**
   * Verifica si un enlace está activo
   */
  const isActive = (path) => {
    return location.pathname === path;
  };

  /**
   * Obtiene los enlaces según el rol del usuario - CORREGIDO
   */
  const getNavLinks = () => {
    // Enlaces públicos (siempre visibles)
    const publicLinks = [
      { path: '/', label: 'Inicio', icon: 'fas fa-home' },
    ];

    // Si NO está autenticado, mostrar login/register
    if (!isAuthenticated) {
      return publicLinks; // Los botones de login/register están separados
    }

    // Si está autenticado, mostrar enlaces según rol
    let roleLinks = [];
    
    switch (userRole) {
      case 'admin':
        roleLinks = [
          { path: '/dashboard-admin', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
          { path: '/usuarios', label: 'Usuarios', icon: 'fas fa-users' },
          { path: '/rutinas', label: 'Rutinas', icon: 'fas fa-dumbbell' },
          { path: '/reportes', label: 'Reportes', icon: 'fas fa-chart-bar' },
        ];
        break;
        
      case 'entrenador':
        roleLinks = [
          { path: '/dashboard-entrenador', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
          { path: '/clientes', label: 'Clientes', icon: 'fas fa-user-friends' },
          { path: '/rutinas', label: 'Rutinas', icon: 'fas fa-dumbbell' },
          { path: '/horarios', label: 'Horarios', icon: 'fas fa-calendar-alt' },
        ];
        break;
        
      case 'cliente':
        roleLinks = [
          { path: '/dashboard-cliente', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
          { path: '/mi-rutina', label: 'Mi Rutina', icon: 'fas fa-dumbbell' },
          { path: '/mi-progreso', label: 'Mi Progreso', icon: 'fas fa-chart-line' },
          { path: '/perfil', label: 'Mi Perfil', icon: 'fas fa-user-circle' },
        ];
        break;
        
      default:
        roleLinks = [
          { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        ];
    }

    return [...publicLinks, ...roleLinks];
  };

  /**
   * Renderiza los enlaces de navegación principales
   */
  const renderNavLinks = () => {
    const links = getNavLinks();
    
    return links.map((link) => (
      <li className="nav-item" key={link.path}>
        <Link
          className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
          to={link.path}
          onClick={closeMenu}
        >
          <i className={`${link.icon} me-2`}></i>
          {link.label}
        </Link>
      </li>
    ));
  };

  /**
   * Renderiza botones de autenticación (login/register o logout) - CORREGIDO
   */
  const renderAuthButtons = () => {
    // Si NO está autenticado: mostrar Login y Register
    if (!isAuthenticated) {
      return (
        <>
          <li className="nav-item">
            <Link
              className="nav-link btn-login"
              to="/login"
              onClick={closeMenu}
            >
              <i className="fas fa-sign-in-alt me-2"></i>
              Iniciar Sesión
            </Link>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link
              className="nav-link btn-register"
              to="/register"
              onClick={closeMenu}
            >
              <i className="fas fa-user-plus me-2"></i>
              Registrarse
            </Link>
          </li>
          {/* Versión móvil de Register (en una sola línea) */}
          <li className="nav-item d-md-none">
            <Link
              className="nav-link"
              to="/register"
              onClick={closeMenu}
            >
              <i className="fas fa-user-plus me-2"></i>
              Registrarse
            </Link>
          </li>
        </>
      );
    }
    
    // Si está autenticado: mostrar Logout
    return (
      <li className="nav-item">
        <button
          className="nav-link btn-logout"
          onClick={handleLogout}
          aria-label="Cerrar sesión"
        >
          <i className="fas fa-sign-out-alt me-2"></i>
          Cerrar Sesión
        </button>
      </li>
    );
  };

  /**
   * Renderiza el indicador de usuario (solo cuando está autenticado)
   */
  const renderUserInfo = () => {
    if (!isAuthenticated) return null;
    
    const userData = localStorage.getItem('userData');
    const userName = userData ? JSON.parse(userData).name : 'Usuario';
   /* const userEmail = userData ? JSON.parse(userData).email : '';*/
    
    return (
      <div className="user-info d-none d-lg-flex align-items-center">
        <div className="user-avatar">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="user-details ms-2">
          <div className="user-name">{userName}</div>
          <div className="user-role">
            <span className={`role-badge ${userRole}`}>
              {userRole === 'admin' && <i className="fas fa-crown me-1"></i>}
              {userRole === 'entrenador' && <i className="fas fa-dumbbell me-1"></i>}
              {userRole === 'cliente' && <i className="fas fa-user me-1"></i>}
              {userRole}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
      <div className="container-fluid">
        {/* Logo y marca - IZQUIERDA */}
        <Link 
          className="navbar-brand d-flex align-items-center" 
          to="/"
          onClick={closeMenu}
        >
          <img 
            src={logo} 
            alt="VibraFit Gym Logo" 
            className="navbar-logo me-2"
          />
          <div className="brand-text">
            <span className="brand-name">VibraFit</span>
          </div>
        </Link>

        {/* Botón hamburguesa para móviles - DERECHA */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido colapsable - DERECHA */}
        <div 
          className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} 
          id="navbarNav"
        >
          {/* Enlaces principales - CENTRO en desktop, arriba en móvil */}
          <ul className="navbar-nav mx-auto mx-lg-0 me-lg-auto">
            {renderNavLinks()}
          </ul>

          {/* Información de usuario y botones de auth - DERECHA */}
          <ul className="navbar-nav align-items-center">
            {renderUserInfo()}
            {renderAuthButtons()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;