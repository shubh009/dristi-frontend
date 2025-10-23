import React from "react";

export default function PrescriptionHeader({
  patientName,
  setPatientName,
  doctor,
  date,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="text-sm block mb-1">Patient Name</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Patient name"
        />
      </div>
      <div>
        <label className="text-sm block mb-1">Doctor</label>
        <div className="w-full border rounded px-3 py-2 bg-gray-100">
          <div className="font-medium">{doctor.name}</div>
          <div className="text-xs text-gray-600">{doctor.reg}</div>
        </div>
      </div>
      <div>
        <label className="text-sm block mb-1">Date</label>
        <input
          type="date"
          readOnly
          value={date}
          className="w-full border rounded px-3 py-2 bg-gray-50"
        />
      </div>
    </div>
  );
}
