import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import HomePage from "./pages/HomePage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PatientDashboard from "./components/patient/PatientDashboard";
import DoctorDashboard from "./components/doctor/DoctorDashboard";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-full bg-gray-50 text-gray-800">
        {/* Navbar */}
        <Navbar role={user?.role} />

        {/* Main content */}
        <main className="flex-grow flex justify-center items-start w-full bg-gray-50">
          <div className="w-full max-w-screen-xl mx-auto ">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
