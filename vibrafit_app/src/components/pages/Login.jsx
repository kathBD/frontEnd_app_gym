import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";
import "../../assets/styles/Login.css";
import AuthContext from "../../context/AuthContext";
import usuariosService from "../../services/usuariosService";

function Login() {
  const [formData, setFormData] = useState({
    correo: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.correo || !formData.password) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    try {
      const response = await usuariosService.login(
        formData.correo,
        formData.password
      );

      login(response.usuario);

      if (response.usuario.rol === "Administrador") {
        navigate("/admin");
      } else if (response.usuario.rol === "Entrenador") {
        navigate("/entrenador");
      } else {
        navigate("/cliente");
      }
    } catch {
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg fixed-top navbar-login">
        <div className="container-fluid">
          <Link className="navbar-brand text-white d-flex align-items-center" to="/">
            <img src={logo} alt="Logo VibraFit" width="50" className="me-2 rounded" />
            <strong>VibraFit</strong>
          </Link>
        </div>
      </nav>

      {/* LOGIN CARD */}
      <div className="login-container">
        <div className="logo mb-3">
          <img src={logo} alt="VibraFit" className="login-logo me-2" />
          <div className="login-brand">VibraFit</div>
        </div>

        <h4 className="form-title">Iniciar Sesión</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              value={formData.correo}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-login"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}

        <div className="mt-4 text-center">
          <Link to="/" className="btn btn-outline-light btn-sm">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;


