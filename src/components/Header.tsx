import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="modern-header">
      <div className="logo">
        <h1>ZK-Privacy Loan</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/signup" className="nav-link">Sign Up</Link></li>
          <li><Link to="/login" className="nav-link">Log In</Link></li>
          <li><Link to="/loan-history" className="nav-link">Loan History</Link></li>
          <li><Link to="/apply-loan" className="nav-link">Apply for Loan</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
