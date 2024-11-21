import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'; 
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import AddWebsite from './pages/AddWebsite';

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
        <Route path="/dashboard/addwebsite" element={<AddWebsite />} />
      </Routes>
    </Router>
  );
}

export default App;
