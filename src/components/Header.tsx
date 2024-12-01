import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/userSlice";
import "../styles/Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user); // Getting the user state from Redux

  const handleLogout = () => {
    // Clear the user from Redux store and perform any logout logic, e.g., clearing the token
    dispatch(clearUser());
    localStorage.removeItem("token"); // Remove the token from localStorage
    window.location.href = "/"; // Redirect to home page after logout
  };

  return (
    <header className="modern-header">
      <div className="logo">
        <h1>ZK-Privacy Loan</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li><Link to="/dashboard" className="nav-link">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/loan-history" className="nav-link">Loan History</Link></li>
              <li><Link to="/loan-request" className="nav-link">Apply for Loan</Link></li>
              <li><button onClick={handleLogout} className="nav-link">Log Out</button></li>
            </>
          ) : (
            <>
              <li><Link to="/signup" className="nav-link">Sign Up</Link></li>
              <li><Link to="/login" className="nav-link">Log In</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
