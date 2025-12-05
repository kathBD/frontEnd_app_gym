import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Footer from "./components/layout/Footer";
import UsuarioRegistro from "./components/pages/UsuarioRegistro";
import DashboardAdmin from "./components/pages/DashboardAdmin"

function App() {
  return (
    
     <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />      
        <Route path="/Admin" element={<DashboardAdmin/>} />
   
        

      </Routes>
      <Footer/>
    </div>
    
  );
}

export default App;









