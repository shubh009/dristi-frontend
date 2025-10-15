// src/layouts/DoctorDashboardLayout.jsx
import { useState } from "react";
import DoctorSidebar from "../common/doctor/DoctorSidebar";
import DoctorNavbar from "../common/doctor/DoctorNavbar";

export default function DoctorDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DoctorSidebar isOpen={sidebarOpen} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <DoctorNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
