import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import withAuth from './Auth';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import AddWebsite from './pages/AddWebsite';
import EditWebsite from './pages/EditWebsite';
import Profile from './pages/Profile';
import Alerts from './pages/Alerts';
import Tables from './pages/Tables';
import EditTable from './pages/EditTable';
import AddContributor from './pages/AddContributor';
import Forgot_password from './pages/Forgot_Pass';

import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true;

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/register" replace />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/forgot_password/:token" element={<Forgot_password />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/dashboard/addwebsite" element={<AddWebsite />} />
    <Route path="/dashboard/editwebsite" element={<EditWebsite />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/alerts" element={<Alerts />} />
    <Route path="/tables" element={<Tables />} />
    <Route path="/tables/edittable" element={<EditTable />} />
    <Route path="/tables/addcontributor" element={<AddContributor />} />
  </Routes>
);

const AppWrapper = withAuth(App);

export default function Root() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
