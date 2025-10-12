// src/components/common/patient/PatientSidebar.jsx
import { FiHome, FiCalendar, FiUser, FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SidebarBase from "../nvaigation/SidebarBase";
import {
  RiFileList2Line,
  RiMessage2Line,
  RiMessage3Line,
} from "react-icons/ri";

export default function PatientSidebar({ isOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: <FiHome />, path: "/patient/dashboard" },
    { label: "Book Appointment", icon: <FiCalendar />, path: "/patient/book" },
    {
      label: "My Appointments",
      icon: <FiFileText />,
      path: "/patient/appointments",
    },
    { label: "Reports", icon: <RiFileList2Line />, path: "/patient/profile" },
    { label: "Messages", icon: <RiMessage3Line />, path: "/patient/profile" },
    { label: "My Profile", icon: <FiUser />, path: "/patient/profile" },
  ];

  return (
    <SidebarBase
      isOpen={isOpen}
      menuItems={menuItems}
      onSelect={(path) => navigate(path)}
    />
  );
}
