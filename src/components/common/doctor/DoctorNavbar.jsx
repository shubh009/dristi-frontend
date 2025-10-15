// src/components/doctor/DoctorNavbar.jsx
import { useState } from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import NavbarBase from "../../common/nvaigation/NavbarBase";

export default function DoctorNavbar({ onToggleSidebar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <NavbarBase
      title="Doctor Dashboard"
      userRole="Doctor"
      onToggleSidebar={onToggleSidebar}
    />
  );
}
