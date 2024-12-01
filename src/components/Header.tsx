import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/userSlice";
import "../styles/Header.css";
import { FaHome, FaHistory, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaClipboardList } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="modern-header">
      <div className="logo">
        <h1>ZK-Bank Privacy Loan (Binance)</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <NavLink to="/" className="nav-link" activeClassName="active-link">
              <FaHome className="nav-icon" /> Home
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink to="/loan-history" className="nav-link" activeClassName="active-link">
                  <FaHistory className="nav-icon" /> Loan History
                </NavLink>
              </li>
              <li>
                <NavLink to="/loan-request" className="nav-link" activeClassName="active-link">
                  <FaClipboardList className="nav-icon" /> Apply for Loan
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-link logout-button">
                  <FaSignOutAlt className="nav-icon" /> Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/signup" className="nav-link" activeClassName="active-link">
                  <FaUserPlus className="nav-icon" /> Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="nav-link" activeClassName="active-link">
                  <FaSignInAlt className="nav-icon" /> Log In
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
