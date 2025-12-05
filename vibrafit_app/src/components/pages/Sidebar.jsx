import React from 'react';
import './Sidebar.css';

function Sidebar() {
    const menuItems = [
        { icon: "bi bi-house-door-fill", label: "Inicio", link: "/inicio" },
        { icon: "bi bi-people-fill", label: "Gestión de Usuarios", link: "/usuarios" },
        { icon: "bi bi-bell-fill", label: "Notificaciones", link: "#" },
        { icon: "bi bi-card-checklist", label: "Membresías", link: "#" }
    ];

    return (
        <div className="sidebar">
            <div className="text-center mb-4">
                <img src="/img/logo.jpg" alt="Logo" className="sidebar-logo" />
                <h5 className="mt-2">VibraFit Admin</h5>
            </div>
            
            {menuItems.map(function(item, index) {
                return (
                    <a href={item.link} key={index}>
                        <i className={`${item.icon} me-2`}></i>{item.label}
                    </a>
                );
            })}
            
            <form action="/logout" method="post" className="mt-4 px-3">
                <button className="btn btn-outline-light w-100">
                    <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
                </button>
            </form>
        </div>
    );
}

export default Sidebar;