import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">

        <NavLink className="navbar-brand" to="/home">
          GymApp
        </NavLink>

        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                "nav-link " + (isActive ? "active" : "")
              }
              to="/home"
            >
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                "nav-link " + (isActive ? "active" : "")
              }
              to="/admin"
            >
              Admin Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                "nav-link " + (isActive ? "active" : "")
              }
              to="/login"
            >
              Login
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Header;

