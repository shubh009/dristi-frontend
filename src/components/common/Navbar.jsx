import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ role }) {
  const { user, logout } = useAuth();

  const commonLinks = [{ to: "/", label: "Home" }];

  const patientLinks = [
    { to: "/patient/dashboard", label: "Dashboard" },
    { to: "/patient/book", label: "Book Appointment" },
    { to: "/patient/appointments", label: "My Appointments" },
  ];

  const doctorLinks = [
    { to: "/doctor/dashboard", label: "Dashboard" },
    { to: "/doctor/schedule", label: "Schedule" },
    { to: "/doctor/queue", label: "Queue" },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/doctors", label: "Doctors" },
    { to: "/admin/patients", label: "Patients" },
    { to: "/admin/queue", label: "Queue" },
  ];

  const getLinksByRole = () => {
    if (role === "doctor") return doctorLinks;
    if (role === "admin") return adminLinks;
    if (role === "patient") return patientLinks;
    return commonLinks;
  };

  return (
    <header className="bg-gradient-to-r from-teal-700 to-emerald-700 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-wide">
          Dristi Eye Care
        </h1>

        <nav className="flex items-center space-x-6">
          {getLinksByRole().map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-teal-100 transition duration-200"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <button
              onClick={logout}
              className="bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-teal-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-100"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
