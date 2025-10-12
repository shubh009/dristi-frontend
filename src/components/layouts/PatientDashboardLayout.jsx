// src/layouts/PatientDashboardLayout.jsx
import { useState } from "react";
import PatientSidebar from "../common/patient/PatientSidebar";
import PatientNavbar from "../common/patient/PatientNavbar";

export default function PatientDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientSidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col">
        <PatientNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
