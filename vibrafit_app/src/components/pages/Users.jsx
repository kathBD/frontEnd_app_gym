import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usuariosService from "../../services/usuariosService";

function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const [rolFiltro, setRolFiltro] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await usuariosService.getAll(); // ✅ CORRECTO
    setUsuarios(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar este usuario?")) {
      await usuariosService.delete?.(id); // opcional si no tienes delete
      cargarUsuarios();
    }
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    rolFiltro
      ? u.rol.toLowerCase().includes(rolFiltro.toLowerCase())
      : true
  );

  return (
    <div className="usuarios-container">
      <h2 className="usuarios-title">Gestión de Usuarios</h2>

      <div className="usuarios-actions">
        <Link to="/usuarios/nuevo" className="btn-new-user">
          + Nuevo Usuario
        </Link>
      </div>

      <div className="usuarios-filter">
        <label>Filtrar por Rol:</label>
        <input
          type="text"
          placeholder="Cliente, Entrenador, Administrador"
          value={rolFiltro}
          onChange={(e) => setRolFiltro(e.target.value)}
        />
      </div>

      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.rol}</td>
              <td className="usuarios-actions-buttons">
                <Link
                  to={`/usuarios/editar/${usuario.id}`}
                  className="btn-edit"
                >
                  ✏️
                </Link>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(usuario.id)}
                >
                  🗑️
                </button>

                <Link
                  to={`/usuarios/ver/${usuario.id}`}
                  className="btn-view"
                >
                  👁️
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;

