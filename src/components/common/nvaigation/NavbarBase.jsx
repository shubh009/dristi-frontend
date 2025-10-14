// src/components/common/navigation/NavbarBase.jsx
import { FiMenu, FiBell, FiLogOut } from "react-icons/fi";

export default function NavbarBase({ title, onToggleSidebar, userRole }) {
  return (
    <nav className=" sticky flex items-center justify-between bg-white shadow-md  py-3 top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center ">
        {/* <button
          onClick={onToggleSidebar}
          className="text-2xl text-primary hover:text-primary-light transition md:hidden"
        >
          <FiMenu />
        </button> */}
        <h1 className="text-[22px] md:text-2xl font-bold text-primary pl-[80px] pt-1 sm:pt-0">
          {title}
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notifications */}

        {/* User Info */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition mr-4">
          <div className="w-9 h-9 rounded-full bg-primary-gradient flex items-center justify-center text-black font-semibold">
            P
          </div>
          <span className="hidden sm:block capitalize font-medium text-gray-700">
            {userRole}
          </span>
        </div>

        {/* Logout */}
        <button className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-primary transition mr-4">
          <FiLogOut />
          <span className="hidden sm:block text-sm font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}
