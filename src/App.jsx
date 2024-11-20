import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; // Your login page component
import Register from './pages/Register'; 
import ForgotPassword from './pages/ForgotPassword';// Your register page component
import Dashboard from './pages/Dashboard';

import axios from 'axios';

axios.defaults.baseURL = 'https://prakse.proti.lv/api';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from root to /register */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
