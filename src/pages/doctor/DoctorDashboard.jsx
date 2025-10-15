// src/pages/doctor/DoctorDashboard.jsx
import {
  FaUserInjured,
  FaCalendarAlt,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function DoctorDashboard() {
  const stats = [
    { label: "Today's Appointments", value: 12, icon: <FaCalendarAlt /> },
    { label: "Total Patients", value: 128, icon: <FaUserInjured /> },
    { label: "Completed", value: 96, icon: <FaCheckCircle /> },
    { label: "Revenue (₹)", value: "48,200", icon: <FaChartLine /> },
  ];

  const appointments = [
    { id: 1, name: "Ravi Sharma", time: "10:00 AM", type: "Consultation" },
    { id: 2, name: "Priya Verma", time: "11:30 AM", type: "Follow-up" },
    { id: 3, name: "Amit Kumar", time: "1:00 PM", type: "Surgery Review" },
    { id: 4, name: "Neha Singh", time: "3:30 PM", type: "Consultation" },
  ];

  const activities = [
    "Completed appointment with Ravi Sharma",
    "Added diagnosis note for Priya Verma",
    "Updated surgery follow-up schedule for Amit Kumar",
    "New patient registered: Neha Singh",
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Appointments per Month",
        data: [20, 28, 25, 32, 30, 36],
        borderColor: "#af3233eb",
        backgroundColor: "rgba(175,50,51,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 5 } },
    },
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="text-primary text-3xl">{stat.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-800">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Appointments List */}
        <div className="xl:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Today's Appointments
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-2">Patient Name</th>
                <th className="py-2">Time</th>
                <th className="py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{a.name}</td>
                  <td className="py-3">{a.time}</td>
                  <td className="py-3 text-gray-500">{a.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3">
            {activities.map((act, idx) => (
              <li
                key={idx}
                className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                {act}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Graph */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Appointment Overview
        </h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
