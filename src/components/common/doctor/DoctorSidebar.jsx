// src/components/doctor/DoctorSidebar.jsx
import SidebarBase from "../common/navigation/SidebarBase";
import {
  FaHome,
  FaUserInjured,
  FaClipboardList,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";

const doctorMenu = [
  { name: "Dashboard", path: "/doctor/dashboard", icon: FaHome },
  { name: "Patients", path: "/doctor/patients", icon: FaUserInjured },
  { name: "Appointments", path: "/doctor/appointments", icon: FaCalendarAlt },
  { name: "Reports", path: "/doctor/reports", icon: FaClipboardList },
  { name: "Analytics", path: "/doctor/analytics", icon: FaChartLine },
];

export default function DoctorSidebar() {
  return <SidebarBase title="Doctor Panel" menuItems={doctorMenu} />;
}
