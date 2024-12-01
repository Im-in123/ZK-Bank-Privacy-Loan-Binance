import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import LoanHistory from "./pages/LoanHistory";
import Dashboard from "./pages/Dashboard";
import LoanDetails from "./pages/LoanDetail";
import LoanRequest from "./pages/LoanRequest";
import AuthWrapper from "./utils/AuthWrapper";  

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes wrapped in AuthWrapper */}
          <Route
            path="/loan-history"
            element={
              <AuthWrapper>
                <LoanHistory />
              </AuthWrapper>
            }
          />
          <Route
            path="/loan/:loanId"
            element={
              <AuthWrapper>
                <LoanDetails />
              </AuthWrapper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthWrapper>
                <Dashboard />
              </AuthWrapper>
            }
          />
          <Route
            path="/loan-request"
            element={
              <AuthWrapper>
                <LoanRequest />
              </AuthWrapper>
            }
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
