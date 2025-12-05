import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";
import "../../assets/styles/Login.css";

function Login() {
  const [formData, setFormData] = useState({
    correo: "",
    password: ""
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validación básica
    if (!formData.correo || !formData.password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    // Aquí iría la llamada a la API
    console.log("Login data:", formData);
    
    // Simulación de login exitoso
    // setSuccess("Inicio de sesión exitoso");
    // setTimeout(() => navigate("/dashboard"), 1500);
    
    // Por ahora, navegamos al home
    navigate("/");
  };

  return (
    <div className="login-page">
      {/* Navbar para login */}
      <nav className="navbar navbar-expand-lg fixed-top navbar-login">
        <div className="container-fluid">
          <Link className="navbar-brand text-white d-flex align-items-center" to="/">
            <img src={logo} alt="Logo" width="50" className="me-2 rounded" />
            <span style={{ fontWeight: "bold" }}>VibraFit</span>
          </Link>
          <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Formulario de Login */}
      <div className="login-container">
        <div className="logo mb-3">
          <img src={logo} alt="Logo VibraFit" className="login-logo me-2" />
          <div className="login-brand">VibraFit</div>
        </div>
        
        <h4 className="form-title">Iniciar Sesión</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              id="correo" 
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required 
              placeholder="user@email.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
              placeholder="********"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-login">Entrar</button>
        </form>

        {/* Mensaje de error */}
        {error && (
          <div className="mt-3 text-center text-danger">
            {error}
          </div>
        )}

        {/* Mensaje de éxito */}
        {success && (
          <div className="mt-3 text-center text-success">
            {success}
          </div>
        )}

        {/* Enlace para registrarse */}
        <div className="mt-4 text-center">
          <p className="text-light mb-2">¿No tienes cuenta?</p>
          <Link to="/register" className="btn btn-outline-light btn-sm">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

