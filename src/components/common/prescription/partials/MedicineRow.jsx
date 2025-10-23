import React from "react";

const dosageOptions = ["1-0-1", "1-1-1", "0-1-1", "1-0-0", "SOS"];
const durationOptions = ["3 days", "5 days", "7 days", "10 days", "15 days"];

export default function MedicineRow({
  idx,
  row,
  onChange,
  onRemove,
  isMobile,
}) {
  return (
    <div className="border rounded p-3 mb-3 bg-white grid grid-cols-1 md:grid-cols-4 gap-2">
      <input
        placeholder="Medicine name"
        value={row.name}
        onChange={(e) => onChange(idx, { ...row, name: e.target.value })}
        className="border rounded px-3 py-2"
      />
      <select
        value={row.dosage}
        onChange={(e) => onChange(idx, { ...row, dosage: e.target.value })}
        className="border rounded px-3 py-2"
      >
        <option value="">Dosage</option>
        {dosageOptions.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
      <select
        value={row.duration}
        onChange={(e) => onChange(idx, { ...row, duration: e.target.value })}
        className="border rounded px-3 py-2"
      >
        <option value="">Duration</option>
        {durationOptions.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
      <div className="flex gap-2">
        <input
          placeholder="Notes"
          value={row.notes}
          onChange={(e) => onChange(idx, { ...row, notes: e.target.value })}
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          onClick={() => onRemove(idx)}
          className="border rounded px-3 py-2 text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
