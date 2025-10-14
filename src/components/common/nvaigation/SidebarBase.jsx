// src/components/common/navigation/SidebarBase.jsx
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../../assets/img/logo.jpeg";

export default function SidebarBase({ menuItems, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleSelect = (path) => {
    onSelect(path);
    if (window.innerWidth < 768) setIsOpen(false); // auto close on mobile after click
  };

  return (
    <>
      {/* Mobile Toggle Button (top-left corner) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-3 left-4 z-50 bg-primary text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-primary-gradient text-black shadow-lg z-40 transform transition-transform duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center py-3 shadow-md border-b border-white/20 bg-white">
          <img
            src={logo}
            alt="Dristi Eye Care"
            className="w-10 h-10 mr-2 rounded-full"
          />
          <h2 className="text-lg font-semibold">Dristi Eye Care</h2>
        </div>

        {/* Menu Items */}
        <ul className="p-4 space-y-4 mt-10">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleSelect(item.path)}
                className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-full bg-white hover:bg-white transition text-black shadow-md"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-md font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay (for mobile when sidebar open) */}
      {/* {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 top-4 left-4 z-50 bg-primary text-white p-2 rounded-full shadow-lg"
          onClick={() => setIsOpen(false)}
        ></div>
      )} */}
    </>
  );
}
