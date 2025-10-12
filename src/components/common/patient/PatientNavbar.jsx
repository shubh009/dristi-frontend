// src/components/common/patient/PatientNavbar.jsx
import NavbarBase from "../nvaigation/NavbarBase";

export default function PatientNavbar({ onToggleSidebar }) {
  return (
    <NavbarBase
      title="Patient Dashboard"
      userRole="patient"
      onToggleSidebar={onToggleSidebar}
    />
  );
}
