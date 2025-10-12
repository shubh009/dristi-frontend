// src/components/common/navigation/NavbarBase.jsx
import { FiMenu, FiBell, FiLogOut } from "react-icons/fi";

export default function NavbarBase({ title, onToggleSidebar, userRole }) {
  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-3 sticky top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-2xl text-primary hover:text-primary-light transition md:hidden"
        >
          <FiMenu />
        </button>
        <h1 className="text-lg md:text-2xl font-semibold text-primary">
          {title}
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FiBell className="text-xl text-gray-600 hover:text-primary transition" />
          <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs font-bold px-1.5 py-0.5 rounded-full">
            3
          </span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition">
          <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-white font-semibold">
            P
          </div>
          <span className="hidden sm:block capitalize font-medium text-gray-700">
            {userRole}
          </span>
        </div>

        {/* Logout */}
        <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
          <FiLogOut />
          <span className="hidden sm:block text-sm font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}
