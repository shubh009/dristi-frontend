// src/components/doctor/DoctorSidebar.jsx
import SidebarBase from "../nvaigation/SidebarBase";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserInjured,
  FaClipboardList,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";

import {
  Ri24HoursLine,
  RiCalendar2Line,
  RiFileList2Line,
  RiMessage2Line,
  RiMessage3Line,
} from "react-icons/ri";
import { TbMessage2Plus, TbReceipt } from "react-icons/tb";
import { RxLapTimer } from "react-icons/rx";
import { PiPrescriptionDuotone } from "react-icons/pi";

export default function DoctorSidebar({ isOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, path: "/doctor/dashboard" },
    {
      label: "Patients List",
      icon: <RiFileList2Line />,
      path: "/doctor/patient-list",
    },
    {
      label: "All Appointments",
      icon: <RiCalendar2Line />,
      path: "/doctor/appoitment-list",
    },
    {
      label: "Prescription List",
      icon: <PiPrescriptionDuotone />,
      path: "/doctor/prescription-list",
    },
    {
      label: "Schedule OPD",
      icon: <RxLapTimer />,
      path: "/doctor/schedule-opd",
    },
    { label: "Reports", icon: <TbReceipt />, path: "#" },
    { label: "Messages", icon: <TbMessage2Plus />, path: "#" },
  ];

  return (
    <SidebarBase
      isOpen={isOpen}
      menuItems={menuItems}
      onSelect={(path) => navigate(path)}
    />
  ); //<SidebarBase title="Doctor Panel" menuItems={doctorMenu} />;
}
