import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import "../../assets/styles/Users.css";

function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rolFiltro, setRolFiltro] = useState("");
  const [rolFiltrado, setRolFiltrado] = useState("");
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const data = await api.usuarios.getAll();
      setUsuarios(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar usuarios. Usando datos de prueba.");
      // Datos mock de respaldo
      setUsuarios(getMockUsuarios());
    } finally {
      setLoading(false);
    }
  };

  const getMockUsuarios = () => [
    {
      usuarioId: 1,
      nombre: "Admin Principal",
      correo: "admin@vibrafit.com",
      rol: { nombre: "Administrador" },
      activo: true
    },
    {
      usuarioId: 2,
      nombre: "Juan Pérez",
      correo: "cliente@vibrafit.com",
      rol: { nombre: "Cliente" },
      activo: true
    },
    {
      usuarioId: 3,
      nombre: "María Gómez",
      correo: "entrenador@vibrafit.com",
      rol: { nombre: "Entrenador" },
      activo: true
    },
  ];

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        const success = await api.usuarios.delete(id);
        if (success) {
          setUsuarios(usuarios.filter(u => u.usuarioId !== id));
          alert("Usuario eliminado exitosamente");
        }
      } catch (err) {
        alert("Error al eliminar usuario. Simulando eliminación.");
        setUsuarios(usuarios.filter(u => u.usuarioId !== id));
      }
    }
  };

  const toggleEstado = async (id, estadoActual) => {
    const nuevoEstado = !estadoActual;
    
    try {
      await api.usuarios.update(id, { activo: nuevoEstado });
      setUsuarios(usuarios.map(u => 
        u.usuarioId === id ? { ...u, activo: nuevoEstado } : u
      ));
    } catch (err) {
      alert("Error al cambiar estado. Simulando cambio.");
      setUsuarios(usuarios.map(u => 
        u.usuarioId === id ? { ...u, activo: nuevoEstado } : u
      ));
    }
  };

  const handleFiltrar = (e) => {
    e.preventDefault();
    setRolFiltrado(rolFiltro);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLimpiarFiltro = () => {
    setRolFiltro("");
    setRolFiltrado("");
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    rolFiltrado
      ? u.rol && u.rol.nombre?.toLowerCase().includes(rolFiltrado.toLowerCase())
      : true
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="users-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin">
            <img 
              src="/img/logo.jpg" 
              alt="Logo" 
              width="40" 
              className="d-inline-block align-text-top me-2 rounded-circle"
            />
            VibraFit Admin
          </Link>

          <div className="d-flex align-items-center">
            <button onClick={handleLogout} className="btn btn-outline-light">
              <i className="bi bi-box-arrow-right me-1"></i>
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Gestión de Usuarios</h2>
            <p className="text-muted">Administra los usuarios del sistema</p>
          </div>
          <Link to="/usuarios/nuevo" className="btn btn-success">
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Usuario
          </Link>
        </div>

        {error && (
          <div className="alert alert-warning alert-dismissible fade show">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        {/* Filtros */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Filtrar Usuarios</h5>
            <form onSubmit={handleFiltrar} className="row g-3">
              <div className="col-md-6">
                <label htmlFor="rol" className="form-label">Rol</label>
                <select
                  id="rol"
                  className="form-select"
                  value={rolFiltro}
                  onChange={(e) => setRolFiltro(e.target.value)}
                >
                  <option value="">Todos los roles</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Cliente">Cliente</option>
                  <option value="Entrenador">Entrenador</option>
                </select>
              </div>
              <div className="col-md-6 d-flex align-items-end">
                <div>
                  <button type="submit" className="btn btn-primary me-2">
                    <i className="bi bi-funnel me-1"></i>
                    Filtrar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={handleLimpiarFiltro}
                  >
                    <i className="bi bi-x-circle me-1"></i>
                    Limpiar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((usuario) => (
                    <tr key={usuario.usuarioId}>
                      <td>{usuario.usuarioId}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.correo}</td>
                      <td>
                        <span className={`badge bg-${usuario.rol?.nombre === 'Administrador' ? 'danger' : usuario.rol?.nombre === 'Entrenador' ? 'warning' : 'info'}`}>
                          {usuario.rol?.nombre}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${usuario.activo ? 'bg-success' : 'bg-danger'}`}>
                          {usuario.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/usuarios/editar/${usuario.usuarioId}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            title={usuario.activo ? 'Desactivar' : 'Activar'}
                            onClick={() => toggleEstado(usuario.usuarioId, usuario.activo)}
                          >
                            <i className={`bi ${usuario.activo ? 'bi-toggle-off' : 'bi-toggle-on'}`}></i>
                          </button>
                          
                          <Link
                            to={`/usuarios/ver/${usuario.usuarioId}`}
                            className="btn btn-sm btn-outline-info"
                            title="Ver Detalles"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          
                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar"
                            onClick={() => handleDelete(usuario.usuarioId)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {usuariosFiltrados.length === 0 && (
              <div className="text-center py-4">
                <i className="bi bi-people display-1 text-muted"></i>
                <h4 className="mt-3">No hay usuarios</h4>
                <p className="text-muted">
                  {rolFiltrado 
                    ? `No se encontraron usuarios con el rol "${rolFiltrado}"`
                    : "No hay usuarios registrados en el sistema"}
                </p>
                <Link to="/usuarios/nuevo" className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2"></i>
                  Crear primer usuario
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card text-white bg-primary">
              <div className="card-body">
                <h5 className="card-title">Total Usuarios</h5>
                <h2 className="card-text">{usuarios.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success">
              <div className="card-body">
                <h5 className="card-title">Activos</h5>
                <h2 className="card-text">{usuarios.filter(u => u.activo).length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-warning">
              <div className="card-body">
                <h5 className="card-title">Por Rol</h5>
                <p className="card-text mb-0">
                  Admin: {usuarios.filter(u => u.rol?.nombre === 'Administrador').length}
                </p>
                <p className="card-text mb-0">
                  Clientes: {usuarios.filter(u => u.rol?.nombre === 'Cliente').length}
                </p>
                <p className="card-text">
                  Entrenadores: {usuarios.filter(u => u.rol?.nombre === 'Entrenador').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;