import React from "react";

export default function SlotItem({ slot, onToggle }) {
  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <div>
        <div className="text-sm">{slot.time}</div>
        <div className="text-xs text-gray-500">
          {slot.booked
            ? "Booked"
            : slot.available
            ? "Available"
            : "Unavailable"}
        </div>
      </div>
      <div>
        <button
          onClick={onToggle}
          className={`px-3 py-1 rounded text-sm ${
            slot.booked
              ? "bg-blue-400 text-white"
              : slot.available
              ? "bg-green-500 text-white"
              : "bg-gray-300"
          }`}
          disabled={slot.booked}
          title={
            slot.booked
              ? "Booked slots cannot be toggled"
              : "Toggle availability"
          }
        >
          {slot.booked ? "Booked" : slot.available ? "On" : "Off"}
        </button>
      </div>
    </div>
  );
}
