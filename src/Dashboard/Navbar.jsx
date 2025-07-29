import React from "react";
import "./Navbar.css";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <h1>🎫 Ticket Management System</h1>
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
