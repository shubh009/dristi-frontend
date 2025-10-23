/**
 * appointmentService.js
 * - Replace BASE_URL with your API host.
 * - Each function returns a Promise.
 *
 * This file contains a fallback mock if the network fails (helps dev).
 */

const BASE_URL = ""; // change as needed

async function safeFetch(url, opts = {}) {
  try {
    const res = await fetch(url, opts);
    if (!res.ok) throw new Error("Network response not ok");
    return await res.json();
  } catch (err) {
    console.warn("Network failed for", url, err.message);
    return null;
  }
}

// Mock data fallback (used when API not available)
const mockAppointments = [
  {
    id: "appt_1",
    patientName: "Rajesh Kumar",
    phone: "9876543210",
    date: "2025-10-20",
    time: "10:30",
    doctor: "Dr. Sharma",
    status: "Pending",
    createdAt: "2025-10-15T08:30:00Z",
    notes: "First time - check vision",
  },
  {
    id: "appt_2",
    patientName: "Meera Singh",
    phone: "9123456789",
    date: "2025-10-20",
    time: "11:00",
    doctor: "Dr. Patel",
    status: "Confirmed",
    createdAt: "2025-10-16T09:00:00Z",
    notes: "",
  },
];

export async function fetchAppointments(params = {}) {
  // params could include date, doctorId, status, page, etc
  const q = new URLSearchParams(params).toString();
  const res = await safeFetch(`${BASE_URL}/appointments?${q}`);
  if (res && Array.isArray(res.data)) return res.data;
  // fallback
  return mockAppointments;
}

export async function updateAppointmentStatus(appointmentId, status) {
  const res = await safeFetch(
    `${BASE_URL}/appointments/${appointmentId}/status`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }
  );
  if (res && res.success) return res.data;
  // In mock fallback, return updated object
  return { id: appointmentId, status };
}

export async function rescheduleAppointment(appointmentId, { date, time }) {
  const res = await safeFetch(
    `${BASE_URL}/appointments/${appointmentId}/reschedule`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, time }),
    }
  );
  if (res && res.success) return res.data;
  return { id: appointmentId, date, time };
}

export async function createAppointment(payload) {
  const res = await safeFetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res && res.success) return res.data;
  return { ...payload, id: "appt_mock_" + Date.now() };
}
