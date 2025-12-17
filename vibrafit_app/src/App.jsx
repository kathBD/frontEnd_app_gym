// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";

import DashboardAdmin from "./components/pages/DashboardAdmin.jsx"
import DashboardCliente from "./components/pages/dashboardCliente.jsx"
import DashboardEntrenador from "./components/pages/dashboardEntrenador.jsx";


function App() {
  return (
    <div className="app-container">
      <Navbar />

      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboards por rol */}
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/cliente" element={<DashboardCliente />} />
        <Route path="/entrenador" element={<DashboardEntrenador />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;










