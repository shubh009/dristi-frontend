import { RiCalendarEventLine } from "react-icons/ri";

// src/pages/patient/DashboardHome.jsx
export default function DashboardHome() {
  return (
    <div>
      <div className="my-10 px-6 md:px-20 py-10 rounded-3xl shadow-md bg-secondary/70 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Text Section */}
        <div>
          <h2 className="text-2xl font-bold text-black  md:mb-0">
            Welcome, Patient Name
          </h2>
          <p className="text-black text-xl mt-2">
            Looking for an professional Eye Expert for a Consultation?
          </p>
        </div>

        {/* Button Section */}
        <button className="bg-white text-primary font-bold px-6 py-3 rounded-full shadow hover:bg-primary hover:text-white transition duration-300 ease-in-out w-full md:w-auto text-xl">
          <RiCalendarEventLine className="inline-block mr-2 text-xl" />
          Book Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="font-semibold text-black text-xl">
            Upcoming Appointment
          </h3>
          <p className="text-gray-500 mt-2">No appointments scheduled yet.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="font-semibold text-black text-xl">Your Digital ID</h3>
          <p className="text-gray-500 mt-2">Generate your digital ID soon.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="font-semibold text-black text-xl">Notifications</h3>
          <p className="text-gray-500 mt-2">No new notifications.</p>
        </div>
      </div>
    </div>
  );
}
