import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LoanDetails from './pages/LoanDetails';
import LoanHistory from './pages/LoanHistory';
 


const Router = () => {
  return (
             <BrowserRouter >

        <Header/>
    <Routes>
    {/* <Route path="/" element={<AuthController><Landing /></AuthController>} exact/> */}
      <Route
        path="signin"
        element={<Login />} exact
      />
      <Route path="/signup" element={<Signup />} exact />
      {/* <Route path="/form" element={ <AuthController><Form /></AuthController>} exact /> */}
 
   </Routes>
   </BrowserRouter>
   )
}

export default Router