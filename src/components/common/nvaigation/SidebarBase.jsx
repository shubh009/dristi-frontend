// src/components/common/navigation/SidebarBase.jsx
import logo from "../../../assets/img/logo.jpeg";

export default function SidebarBase({ isOpen, menuItems, onSelect }) {
  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-gradient-to-b from-[#fde1cc] to-[#edddab] text-black shadow-lg z-50 transform transition-transform duration-300`}
    >
      <div className="flex items-center justify-center py-3 shadow-md border-b border-white/20 bg-white">
        <img src={logo} alt="Dristi Eye Care" className="w-10 h-10 mr-2" />
        <h2 className="text-lg font-semibold">Dristi Eye Care</h2>
      </div>

      <ul className="p-4 space-y-6 mt-14">
        {menuItems.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => onSelect(item.path)}
              className="flex items-center gap-4 w-full text-left px-4 py-2 rounded-full transition text-black shadow-md inset-shadow-orange-500"
            >
              {item.icon}
              <span className="text-md">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
