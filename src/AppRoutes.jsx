// src/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PatientDashboardLayout from "./layouts/PatientDashboardLayout";
import DashboardHome from "./pages/patient/DashboardHome";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Patient Dashboard */}
      <Route
        path="/patient/*"
        element={
          <PatientDashboardLayout>
            <Routes>
              <Route path="dashboard" element={<DashboardHome />} />
            </Routes>
          </PatientDashboardLayout>
        }
      />
    </Routes>
  );
}
