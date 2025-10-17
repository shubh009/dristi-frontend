import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import HomePage from "./pages/HomePage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import PatientDashboardLayout from "./components/layouts/PatientDashboardLayout";
import DashboardHome from "./pages/patient/DashboardHome";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import PatientProfile from "./pages/patient/PatientProfile";

import DoctorDashboardLayout from "./components/layouts/DoctorDashboardLayout"; // (to be created similar to patient)
import DoctorDashboardHome from "./pages/doctor/DoctorDashboard"; // (doctor main dashboard page)
import DoctorPatients from "./pages/doctor/DoctorPatients";
import SchedulePage from "./pages/doctor/SchedulePage";

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();

  // Detect if we are inside a dashboard route
  const isDashboardRoute =
    location.pathname.startsWith("/patient") ||
    location.pathname.startsWith("/doctor");

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* Show global navbar/footer only on public routes */}
      {!isDashboardRoute && <Navbar role={user?.role} />}

      <main>
        <div className="w-full">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* PATIENT DASHBOARD ROUTES */}
            <Route
              path="/patient/*"
              element={
                <PatientDashboardLayout>
                  <Routes>
                    <Route path="dashboard" element={<DashboardHome />} />
                    <Route
                      path="/book-appointment"
                      element={<BookAppointment />}
                    />
                    <Route
                      path="/my-appointment"
                      element={<MyAppointments />}
                    />
                    <Route path="/profile" element={<PatientProfile />} />
                  </Routes>
                </PatientDashboardLayout>
              }
            />

            {/* DOCTOR DASHBOARD ROUTES */}
            <Route
              path="/doctor/*"
              element={
                <DoctorDashboardLayout>
                  <Routes>
                    <Route path="dashboard" element={<DoctorDashboardHome />} />
                  </Routes>
                  <Routes>
                    <Route path="patient-list" element={<DoctorPatients />} />
                  </Routes>
                  <Routes>
                    <Route path="schedule-opd" element={<SchedulePage />} />
                  </Routes>
                </DoctorDashboardLayout>
              }
            />
          </Routes>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </div>
      </main>

      {!isDashboardRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
