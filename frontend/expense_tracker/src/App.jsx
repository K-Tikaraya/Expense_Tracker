import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";


const App = () => { 
  return (
   <div>
    <Router>
      <Routes>
        console.log("App is running");
        <Route path = "/" element = {<Root />} />
        <Route path = "/login" exact element = {<Login />} />
        <Route path = "/SignUp" exact element = {<SignUp />} />
        <Route path = "/dashboard" exact element = {<Home />} />
        <Route path = "/Expense" exact element = {<Expense />} />
        <Route path = "/income" exact element = {<Income />} />
      </Routes>
    </Router>

   </div>
  );
};

export default App 

const Root = () =>{
  // check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
  <Navigate to ="/dashboard" />
):
  (
  <Navigate to="/login" />
);
};  
