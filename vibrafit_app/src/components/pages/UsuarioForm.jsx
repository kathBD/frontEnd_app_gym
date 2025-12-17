
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { usuariosService } from "../services/usuarios";
import "./UsuarioForm.css";

function UsuarioForm() {
  const { id } = useParams(); // Si hay ID, es edición, si no, es nuevo
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(!!id);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    telefono: "",
    sexo: "M",
    peso: "",
    estatura: "",
    fechaNacimiento: "",
    estadoFisico: "",
    objetivo: "",
    especialidad: "",
    horarioInicio: "",
    horarioFin: "",
    activo: true,
    rolId: "1" // ID por defecto para Cliente
  });

  // Mock de roles
  const [roles] = useState([
    { rolId: 1, nombre: "Cliente" },
    { rolId: 2, nombre: "Entrenador" },
    { rolId: 3, nombre: "Administrador" }
  ]);

  // Cargar datos si es edición
  useEffect(() => {
    if (id) {
      cargarUsuario();
    }
  }, [id]);

  const cargarUsuario = async () => {
    try {
      const usuario = await usuariosService.getById(id);
      if (usuario) {
        // Mapear los datos del usuario al formulario
        setFormData({
          nombre: usuario.nombre || "",
          correo: usuario.correo || "",
          password: "", // No cargamos la contraseña por seguridad
          telefono: usuario.telefono || "",
          sexo: usuario.sexo || "M",
          peso: usuario.peso || "",
          estatura: usuario.estatura || "",
          fechaNacimiento: usuario.fechaNacimiento || "",
          estadoFisico: usuario.estadoFisico || "",
          objetivo: usuario.objetivo || "",
          especialidad: usuario.especialidad || "",
          horarioInicio: usuario.horarioInicio || "",
          horarioFin: usuario.horarioFin || "",
          activo: usuario.activo !== false,
          rolId: usuario.rolId ? usuario.rolId.toString() : "1"
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error cargando usuario:", error);
      setError("No se pudo cargar el usuario");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Manejar valores booleanos del select
    let finalValue = value;
    if (name === "activo") {
      finalValue = value === "true";
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    // Validaciones básicas
    if (!formData.nombre || !formData.correo || (!id && !formData.password)) {
      setError("Nombre, correo y contraseña son obligatorios");
      return;
    }

    if (!id && formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      if (id) {
        // Editar usuario existente
        await usuariosService.update(id, formData);
        setMensaje("Usuario actualizado correctamente");
      } else {
        // Crear nuevo usuario
        await usuariosService.create(formData);
        setMensaje("Usuario creado correctamente");
      }

      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        navigate("/admin/usuarios");
      }, 1500);

    } catch (error) {
      setError(id ? "Error al actualizar el usuario" : "Error al crear el usuario");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  const titulo = id ? "Editar Usuario" : "Registrar Nuevo Usuario";

  return (
    <div className="usuario-form-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top navbar-form">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            <img 
              src="/img/logo.jpg" 
              alt="Logo" 
              width="40" 
              className="d-inline-block align-text-top me-2"
            />
            VibraFit
          </a>

          <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-white mx-3" href="/inicio">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={logout}>
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenedor del formulario */}
      <div className="form-container">
        {/* Mensajes de éxito y error */}
        {mensaje && (
          <div className="alert alert-success">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className="mb-3">
          <button 
            onClick={() => navigate("/admin/usuarios")} 
            className="btn btn-primary"
          >
            Regresar
          </button>
        </div>

        <h2 className="form-title">{titulo}</h2>

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre *</label>
            <input 
              type="text" 
              className="form-control" 
              id="nombre" 
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required 
            />
          </div>

          {/* Correo */}
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo *</label>
            <input 
              type="email" 
              className="form-control" 
              id="correo" 
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required 
            />
          </div>

          {/* Contraseña (solo para nuevo usuario) */}
          {!id && (
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña *</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required 
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          )}

          {/* Teléfono */}
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input 
              type="text" 
              className="form-control" 
              id="telefono" 
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

          {/* Sexo */}
          <div className="mb-3">
            <label htmlFor="sexo" className="form-label">Sexo *</label>
            <select 
              className="form-select" 
              id="sexo" 
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              required 
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>

          <div className="row">
            {/* Peso */}
            <div className="col-md-6 mb-3">
              <label htmlFor="peso" className="form-label">Peso (kg) *</label>
              <input 
                type="number" 
                step="0.01" 
                className="form-control" 
                id="peso" 
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                required 
              />
            </div>

            {/* Estatura */}
            <div className="col-md-6 mb-3">
              <label htmlFor="estatura" className="form-label">Estatura (cm) *</label>
              <input 
                type="number" 
                step="0.01" 
                className="form-control" 
                id="estatura" 
                name="estatura"
                value={formData.estatura}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          {/* Fecha de nacimiento */}
          <div className="mb-3">
            <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento *</label>
            <input 
              type="date" 
              className="form-control" 
              id="fechaNacimiento" 
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required 
            />
          </div>

          {/* Estado Físico */}
          <div className="mb-3">
            <label htmlFor="estadoFisico" className="form-label">Estado Físico</label>
            <input 
              type="text" 
              className="form-control" 
              id="estadoFisico" 
              name="estadoFisico"
              value={formData.estadoFisico}
              onChange={handleChange}
              placeholder="Principiante, Intermedio, Avanzado"
            />
          </div>

          {/* Objetivo */}
          <div className="mb-3">
            <label htmlFor="objetivo" className="form-label">Objetivo</label>
            <input 
              type="text" 
              className="form-control" 
              id="objetivo" 
              name="objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              placeholder="Perder peso, Ganar músculo, etc."
            />
          </div>

          {/* Especialidad */}
          <div className="mb-3">
            <label htmlFor="especialidad" className="form-label">Especialidad</label>
            <input 
              type="text" 
              className="form-control" 
              id="especialidad" 
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              placeholder="Crossfit, Yoga, Pilates, etc."
            />
          </div>

          <div className="row">
            {/* Horario de Inicio */}
            <div className="col-md-6 mb-3">
              <label htmlFor="horarioInicio" className="form-label">Horario de Inicio</label>
              <input 
                type="time" 
                className="form-control" 
                id="horarioInicio" 
                name="horarioInicio"
                value={formData.horarioInicio}
                onChange={handleChange}
              />
            </div>

            {/* Horario de Fin */}
            <div className="col-md-6 mb-3">
              <label htmlFor="horarioFin" className="form-label">Horario de Fin</label>
              <input 
                type="time" 
                className="form-control" 
                id="horarioFin" 
                name="horarioFin"
                value={formData.horarioFin}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Estado Activo */}
          <div className="mb-3">
            <label htmlFor="activo" className="form-label">Activo *</label>
            <select 
              className="form-select" 
              id="activo" 
              name="activo"
              value={formData.activo.toString()}
              onChange={handleChange}
              required 
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          {/* Rol */}
          <div className="mb-3">
            <label htmlFor="rolId" className="form-label">Rol *</label>
            <select 
              className="form-select" 
              id="rolId" 
              name="rolId"
              value={formData.rolId}
              onChange={handleChange}
              required 
            >
              {roles.map(rol => (
                <option key={rol.rolId} value={rol.rolId}>
                  {rol.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-save">
              Guardar
            </button>

            <button 
              type="button" 
              onClick={() => navigate("/admin/usuarios")}
              className="btn btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsuarioForm;