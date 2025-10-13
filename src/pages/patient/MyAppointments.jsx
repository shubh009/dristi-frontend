// src/features/Appointment/AppointmentList.jsx
import React, { useEffect, useState } from "react";
import {
  RiUserLine,
  RiCalendarLine,
  RiTimeLine,
  RiArrowDownSLine,
  RiStethoscopeLine,
} from "react-icons/ri";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");

  // Dummy data
  const dummyData = [
    {
      id: 1,
      patientName: "John Doe",
      serviceName: "Eye Checkup",
      date: "2025-10-14",
      time: "10:30",
      status: "Confirmed",
    },
    {
      id: 2,
      patientName: "Jane Roe",
      serviceName: "Glucoma Screening",
      date: "2025-10-14",
      time: "12:00",
      status: "Pending",
    },
    {
      id: 3,
      patientName: "Michael Lee",
      serviceName: " Contact Lens Fitting",
      date: "2025-10-15",
      time: "09:15",
      status: "Cancelled",
    },
  ];

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setAppointments(dummyData);
      setFilteredAppointments(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle date filtering
  useEffect(() => {
    if (!filterDate) {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(
        (a) => new Date(a.date).toISOString().split("T")[0] === filterDate
      );
      setFilteredAppointments(filtered);
    }
  }, [filterDate, appointments]);

  // Format date & time
  const formatDateTime = (date, time) => {
    return new Date(date + "T" + time).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStatusBadge = (status) => {
    const statusStyles = {
      Confirmed: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          statusStyles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    // Skeleton loader
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse bg-gray-200 h-56 rounded-xl"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Filter by Date */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <RiCalendarLine className="text-xl" />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {filterDate && (
          <button
            onClick={() => setFilterDate("")}
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            Clear Filter <RiArrowDownSLine />
          </button>
        )}
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <RiUserLine className="mx-auto h-16 w-16 text-gray-300" />
          <p className="mt-4">No appointments found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="relative bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow transform hover:scale-105"
            >
              {/* Left Accent Bar */}
              <div
                className={`absolute left-0 top-0 h-full w-2 ${
                  appointment.status === "Confirmed"
                    ? "bg-green-500"
                    : appointment.status === "Pending"
                    ? "bg-yellow-400"
                    : "bg-red-500"
                }`}
              ></div>

              <div className="p-5 ml-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 border-b pb-3">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <RiUserLine /> {appointment.patientName}
                  </h3>
                  {renderStatusBadge(appointment.status)}
                </div>

                {/* Body */}
                <div className="space-y-2 text-gray-600  pb-3">
                  <p className="flex items-center gap-2 text-md text-black font-semibold">
                    <RiStethoscopeLine className="text-lg text-black font-semibold"></RiStethoscopeLine>
                    {appointment.serviceName}
                  </p>
                  <p className="flex items-center gap-2">
                    <RiCalendarLine />{" "}
                    {formatDateTime(appointment.date, appointment.time)}
                  </p>
                </div>
                <div className="space-y-2 text-gray-600 ">
                  <button className="bg-primary-gradient text-black shadow-lg w-100 px-10 py-2 rounded-full hover:bg-orange-600 transition font-bold  mt-4 text-[18px]">
                    Get Hospital Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
