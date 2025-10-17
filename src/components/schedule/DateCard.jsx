import React from "react";

function shortLabel(dateStr) {
  const dt = new Date(dateStr);
  return `${dt.getDate()}/${dt.getMonth() + 1}`;
}

export default function DateCard({ dateStr, slots = [], isSelected, onClick }) {
  const booked = slots.filter((s) => s.booked).length;
  const available = slots.filter((s) => s.available && !s.booked).length;
  const unavailable = slots.filter((s) => !s.available && !s.booked).length;

  return (
    <div
      onClick={onClick}
      className={`p-2 border rounded cursor-pointer bg-white ${
        isSelected ? "ring-2 ring-blue-400" : ""
      }`}
      title={`${dateStr}\nAvailable: ${available}\nBooked: ${booked}`}
    >
      <div className="text-xs font-medium">{shortLabel(dateStr)}</div>
      <div className="text-xs text-gray-500">
        {new Date(dateStr).toLocaleString(undefined, { weekday: "short" })}
      </div>

      <div className="mt-2 flex gap-1 flex-wrap">
        {/* mini dots showing availability -- show up to 8 indicators */}
        {slots.slice(0, 8).map((s, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded ${
              s.booked
                ? "bg-blue-400"
                : s.available
                ? "bg-green-400"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="mt-1 text-xs text-gray-500">
        {available} open • {booked} booked
      </div>
    </div>
  );
}
