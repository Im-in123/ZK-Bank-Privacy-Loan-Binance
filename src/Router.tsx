import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
 
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import LoanHistory from "./pages/LoanHistory";
 
 

const Router = () => {
  return (
    <BrowserRouter>
        <Header />
      <div className="app-container">
      
          <Routes>
           
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loan-history" element={<LoanHistory />} />
             
          </Routes>
       
      </div>
        <Footer />
    </BrowserRouter>
  );
};

export default Router;