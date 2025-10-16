import { useState } from "react";
import CreateAppointmentDrawer from "../../components/common/forms/CreateAppointmentDrawer";
import { FaPlus } from "react-icons/fa";
import { PiPlusCircleLight } from "react-icons/pi";
import ResponsiveDataTable from "../../components/common/ui-components/tables/ResponsiveDataTable";

export default function DoctorPatients() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "city", label: "City" },
    { key: "type", label: "Type" },
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
  ];

  const data = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      city: "Agra",
      type: "First Visit",
      date: "2025-10-15",
      time: "10:30 AM",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "8765432109",
      city: "Delhi",
      type: "First Visit",
      date: "2025-10-15",
      time: "10:30 AM",
    },
    {
      name: "Ravi Kumar",
      email: "ravi@demo.com",
      phone: "9999999999",
      city: "Lucknow",
      type: "Followup Visit",
      date: "2025-10-15",
      time: "10:30 AM",
    },
    // more rows...
  ];

  // const data = [
  //   {
  //     name: "John Doe",
  //     email: "john@example.com",
  //     phone: "9876543210",
  //     city: "Agra",
  //     type: "First Visit",
  //     date: "2025-10-15",
  //     time: "10:30 AM",
  //   },
  //   {
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     phone: "8765432109",
  //     city: "Delhi",
  //     type: "First Visit",
  //     date: "2025-10-15",
  //     time: "10:30 AM",
  //   },
  //   {
  //     name: "Ravi Kumar",
  //     email: "ravi@demo.com",
  //     phone: "9999999999",
  //     city: "Lucknow",
  //     type: "First Visit",
  //     date: "2025-10-15",
  //     time: "10:30 AM",
  //   },
  //   // more rows...
  // ];

  const handleEdit = (row) => console.log("Edit:", row);
  const handleDelete = (row) => console.log("Delete:", row);

  return (
    <div className="p-6 relative min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Patients List</h1>

        {/* Desktop Button */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="hidden sm:flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full shadow-md hover:brightness-110 transition border border-orange-500"
        >
          <PiPlusCircleLight className="text-[18px]" />
          Add New Appointment
        </button>
      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {/* <table className="min-w-full text-sm border-collapse border border-gray-300">
          <thead className="bg-orange-100 text-black text-[18px] font-semibold">
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
        </table> */}

        <ResponsiveDataTable
          title="View All Patients"
          columns={columns}
          data={data}
          searchableKeys={[
            "name",
            "email",
            "phone",
            "city",
            "type",
            "date",
            "time",
          ]}
          pageSize={5}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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
