import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";
import '../../assets/styles/Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-logo-section">
                       <img src={logo} alt="Logo" width={60} className="me-2" />
                        <div>
                            <div className="footer-brand">VibraFit Gym</div>
                            <div className="footer-tagline">
                                Tu salud y bienestar es nuestra prioridad
                            </div>
                        </div>
                    </div>
                    
                    <div className="footer-info">
                        <div className="footer-copyright">
                            &copy; {currentYear} VibraFit. Todos los derechos reservados.
                        </div>
                        <div className="social-icons">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;



