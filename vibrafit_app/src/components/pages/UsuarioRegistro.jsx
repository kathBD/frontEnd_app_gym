// src/components/pages/UsuarioRegistro.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/styles/UsuarioRegistro.css';

const UsuarioRegistro = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Datos mock para roles (en producción vendrían de una API)
  const [roles] = useState([
    { rolId: 1, nombre: 'ROLE_ADMINISTRADOR' },
    { rolId: 2, nombre: 'ROLE_ENTRENADOR' },
    { rolId: 3, nombre: 'ROLE_CLIENTE' }
  ]);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    telefono: '',
    sexo: 'M',
    peso: '',
    estatura: '',
    fechaNacimiento: '',
    estadoFisico: '',
    objetivo: '',
    especialidad: '',
    horarioInicio: '',
    horarioFin: '',
    activo: 'true',
    rolId: '3' // Por defecto cliente
  });

  // Estados para manejo de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /**
   * Carga datos del usuario si estamos editando
   */
  useEffect(() => {
    if (id) {
      // Aquí cargarías los datos del usuario desde tu API
      // Por ahora usamos datos mock
      setLoading(true);
      setTimeout(() => {
        // Simulando datos de usuario para edición
        setFormData({
          nombre: 'Juan Pérez',
          correo: 'juan@email.com',
          password: '',
          telefono: '3001234567',
          sexo: 'M',
          peso: '75.5',
          estatura: '1.75',
          fechaNacimiento: '1990-05-15',
          estadoFisico: 'INTERMEDIO',
          objetivo: 'Ganar masa muscular',
          especialidad: '',
          horarioInicio: '08:00',
          horarioFin: '17:00',
          activo: 'true',
          rolId: '3'
        });
        setLoading(false);
      }, 500);
    }
  }, [id]);

  /**
   * Maneja cambios en los campos del formulario
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar mensajes de error al escribir
    if (error) setError('');
  };

  /**
   * Valida el formulario
   */
  const validateForm = () => {
    if (!formData.nombre.trim()) {
      setError('El nombre es obligatorio');
      return false;
    }
    
    if (!formData.correo.trim()) {
      setError('El correo es obligatorio');
      return false;
    }
    
    if (!formData.password && !id) {
      setError('La contraseña es obligatoria para nuevos usuarios');
      return false;
    }
    
    if (formData.password && formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    
    return true;
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Aquí iría la llamada a tu API para guardar/actualizar
      console.log('Datos a enviar:', formData);
      
      // Simulando una respuesta exitosa
      setTimeout(() => {
        setSuccess(id ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente');
        setLoading(false);
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
          navigate('/usuarios');
        }, 2000);
      }, 1000);
      
    } catch (err) {
      setError('Error al guardar el usuario. Por favor, intente nuevamente.');
      setLoading(false);
      console.error('Error:', err);
    }
  };

  /**
   * Formatea la fecha para el input type="date"
   */
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return dateString;
  };

  return (
    <div className="usuario-registro-container">
      <div className="registro-card">
        {/* Botón de regresar */}
        <div className="mb-4">
          <button 
            onClick={() => navigate('/admin')}
            className="btn btn-primary"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Regresar
          </button>
        </div>

        {/* Mensajes de éxito y error */}
        {success && (
          <div className="alert alert-success alert-dismissible fade show">
            <i className="bi bi-check-circle me-2"></i>
            {success}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setSuccess('')}
            ></button>
          </div>
        )}

        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError('')}
            ></button>
          </div>
        )}

        {/* Título */}
        <h2 className="text-center mb-4">
          {id ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
        </h2>

        {loading && !formData.nombre ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando datos del usuario...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Campos del formulario en dos columnas para desktop */}
            <div className="row">
              {/* Columna izquierda */}
              <div className="col-md-6">
                {/* Nombre */}
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Juan Pérez"
                  />
                </div>

                {/* Correo */}
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                    placeholder="ejemplo@email.com"
                  />
                </div>

                {/* Contraseña */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    {id ? 'Nueva Contraseña' : 'Contraseña'} 
                    {!id && <span className="text-danger">*</span>}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={id ? "Dejar en blanco para no cambiar" : "Mínimo 6 caracteres"}
                    minLength={!id ? "6" : undefined}
                    required={!id}
                  />
                  {!id && (
                    <div className="form-text">Mínimo 6 caracteres</div>
                  )}
                </div>

                {/* Teléfono */}
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="3001234567"
                  />
                </div>

                {/* Sexo */}
                <div className="mb-3">
                  <label htmlFor="sexo" className="form-label">Sexo</label>
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

                {/* Peso */}
                <div className="mb-3">
                  <label htmlFor="peso" className="form-label">Peso (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    id="peso"
                    name="peso"
                    value={formData.peso}
                    onChange={handleChange}
                    placeholder="75.5"
                  />
                </div>

                {/* Estatura */}
                <div className="mb-3">
                  <label htmlFor="estatura" className="form-label">Estatura (m)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    id="estatura"
                    name="estatura"
                    value={formData.estatura}
                    onChange={handleChange}
                    placeholder="1.75"
                  />
                </div>
              </div>

              {/* Columna derecha */}
              <div className="col-md-6">
                {/* Fecha de Nacimiento */}
                <div className="mb-3">
                  <label htmlFor="fechaNacimiento" className="form-label">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    value={formatDateForInput(formData.fechaNacimiento)}
                    onChange={handleChange}
                  />
                </div>

                {/* Estado Físico */}
                <div className="mb-3">
                  <label htmlFor="estadoFisico" className="form-label">Estado Físico</label>
                  <select
                    className="form-select"
                    id="estadoFisico"
                    name="estadoFisico"
                    value={formData.estadoFisico}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="PRINCIPIANTE">Principiante</option>
                    <option value="INTERMEDIO">Intermedio</option>
                    <option value="AVANZADO">Avanzado</option>
                    <option value="ATLETA">Atleta</option>
                  </select>
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
                    placeholder="Ej: Ganar masa muscular, perder peso..."
                  />
                </div>

                {/* Especialidad (solo para entrenadores) */}
                {formData.rolId === '2' && (
                  <div className="mb-3">
                    <label htmlFor="especialidad" className="form-label">Especialidad</label>
                    <input
                      type="text"
                      className="form-control"
                      id="especialidad"
                      name="especialidad"
                      value={formData.especialidad}
                      onChange={handleChange}
                      placeholder="Ej: Crossfit, Yoga, Musculación"
                    />
                  </div>
                )}

                {/* Horarios (solo para entrenadores) */}
                {formData.rolId === '2' && (
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="horarioInicio" className="form-label">Horario Inicio</label>
                      <input
                        type="time"
                        className="form-control"
                        id="horarioInicio"
                        name="horarioInicio"
                        value={formData.horarioInicio}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="horarioFin" className="form-label">Horario Fin</label>
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
                )}

                {/* Estado Activo */}
                <div className="mb-3">
                  <label htmlFor="activo" className="form-label">Estado</label>
                  <select
                    className="form-select"
                    id="activo"
                    name="activo"
                    value={formData.activo}
                    onChange={handleChange}
                    required
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>

                {/* Rol */}
                <div className="mb-4">
                  <label htmlFor="rolId" className="form-label">Rol <span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    id="rolId"
                    name="rolId"
                    value={formData.rolId}
                    onChange={handleChange}
                    required
                  >
                    {roles.map((rol) => (
                      <option key={rol.rolId} value={rol.rolId}>
                        {rol.nombre.replace('ROLE_', '')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="d-flex justify-content-between mt-4 pt-3 border-top">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/usuarios')}
                disabled={loading}
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Guardando...
                  </>
                ) : (
                  id ? 'Actualizar Usuario' : 'Crear Usuario'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UsuarioRegistro;