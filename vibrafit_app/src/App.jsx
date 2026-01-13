import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";  
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";

import DashboardAdmin from "./components/pages/DashboardAdmin.jsx"
import DashboardCliente from "./components/pages/dashboardCliente.jsx"
import DashboardEntrenador from "./components/pages/dashboardEntrenador.jsx";

import Users from "./components/pages/Users.jsx";
import UsuarioForm from "./components/pages/UsuarioForm.jsx";

function App() {
  return (
    <div className="app-container">
      {/* AuthProvider debe envolver todo lo que necesite acceso al contexto */}
      <AuthProvider>
        <Navbar />
        
        <Routes>
          {/* Páginas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboards por rol */}
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/cliente" element={<DashboardCliente />} />
          <Route path="/entrenador" element={<DashboardEntrenador />} /> 
          <Route path="/usuarios" element={<Users />} /> 
          <Route path="/register" element={<UsuarioForm />} />
        </Routes>
        
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;










