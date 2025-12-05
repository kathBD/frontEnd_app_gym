import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Home.css";
import "../../assets/styles/DashboardAdmin.css"

function Home() {
  return (
    <div className="home-page">
      <div className="overlay"></div>
      
      <div className="content">
       <div className="container">

          <h1 className="main-title">¡Bienvenido a la plataforma de entrenamiento!</h1>
          
          <p className="description-text">
            Regístrate  para acceder a las rutinas y entrenamientos personalizados.
          </p>       
          
          <div className="text-center mb-5">
            <Link to="/register" className="register-button">
              Activa tu cuenta
            </Link>
          </div>
          
          <div className="cards-grid">
            
            {/* Tarjeta Gestión */}
            <div className="card-item">
              <div className="card-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="card-title">Gestión</h3>
              <p className="card-text">Usuarios, rutinas</p>
              <Link to="/login" className="card-link"></Link>
            </div>

            {/* Tarjeta Ejercicios */}
            <div className="card-item">
              <div className="card-icon">
                <i className="fas fa-dumbbell"></i>
              </div>
              <h3 className="card-title">Ejercicios</h3>
              <p className="card-text">Ver ejercicios</p>
              <Link to="/ejercicios" className="card-link"></Link>
            </div>

            {/* Tarjeta Rutinas */}
            <div className="card-item">
              <div className="card-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3 className="card-title">Rutinas</h3>
              <p className="card-text">Tus entrenamientos</p>
              <Link to="/rutinas" className="card-link"></Link>
            </div>

            {/* Tarjeta Progreso */}
            <div className="card-item">
              <div className="card-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="card-title">Progreso</h3>
              <p className="card-text">Estadísticas</p>
              <Link to="/progreso" className="card-link"></Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

