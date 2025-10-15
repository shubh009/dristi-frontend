import { useState } from "react";
import CreateAppointmentDrawer from "../../components/common/forms/CreateAppointmentDrawer";
import { FaPlus } from "react-icons/fa";

export default function DoctorPatients() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Dummy patients data
  const patients = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 9876543210",
      city: "Agra",
      type: "First Visit",
      date: "2025-10-15",
      time: "10:30 AM",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@example.com",
      phone: "+91 9123456780",
      city: "Delhi",
      type: "Follow-up",
      date: "2025-10-16",
      time: "11:00 AM",
    },
    {
      id: 3,
      name: "Vikram Mehta",
      email: "vikram@example.com",
      phone: "+91 9012345678",
      city: "Mathura",
      type: "Emergency",
      date: "2025-10-17",
      time: "12:45 PM",
    },
  ];

  return (
    <div className="p-6 relative min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Patients List</h1>

        {/* Desktop Button */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="hidden sm:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md shadow-md hover:brightness-110 transition"
        >
          <FaPlus className="text-sm" />
          Add New Appointment
        </button>
      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm border-collapse border border-gray-300">
          <thead className="bg-secondary text-black text-[18px] font-semibold">
            <tr>
              <th className="text-left py-3 px-4 border border-gray-600">
                Name
              </th>
              <th className="text-left py-3 px-4 border border-gray-600">
                Email
              </th>
              <th className="text-left py-3 px-4 border border-gray-600">
                Phone
              </th>
              <th className="text-left py-3 px-4 border border-gray-600">
                City
              </th>
              <th className="text-left py-3 px-4 border border-gray-600">
                Type
              </th>
              <th className="text-left py-3 px-4 border border-gray-600">
                Date
              </th>
              <th className="text-left py-3 px-4 border border-gray-600">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium border border-gray-600">
                  {p.name}
                </td>
                <td className="py-3 px-4 border border-gray-600">{p.email}</td>
                <td className="py-3 px-4 border border-gray-600">{p.phone}</td>
                <td className="py-3 px-4 border border-gray-600">{p.city}</td>
                <td className="py-3 px-4 border border-gray-600">{p.type}</td>
                <td className="py-3 px-4 border border-gray-600">{p.date}</td>
                <td className="py-3 px-4 border border-gray-600">{p.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Floating Button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="sm:hidden fixed bottom-5 right-5 bg-primary text-white p-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
        aria-label="Add Appointment"
      >
        <FaPlus className="text-lg" />
      </button>

      {/* Drawer Component */}
      <CreateAppointmentDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={(data) => console.log("New Appointment:", data)}
      />
    </div>
  );
}
