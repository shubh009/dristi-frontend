// src/pages/patient/DashboardHome.jsx
export default function DashboardHome() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">
        Welcome to Your Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Upcoming Appointment</h3>
          <p className="text-gray-500 mt-2">No appointments scheduled yet.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Digital ID</h3>
          <p className="text-gray-500 mt-2">Generate your digital ID soon.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Notifications</h3>
          <p className="text-gray-500 mt-2">No new notifications.</p>
        </div>
      </div>
    </div>
  );
}
