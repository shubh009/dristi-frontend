import React, { useEffect, useState } from "react";
import SlotItem from "./SlotItem";
import { presetSlots } from "../../utils/slotUtils";
import toast from "react-hot-toast";

export default function SlotPanel({
  date,
  slots = [],
  onUpdate = () => {},
  onCopyPrevious = () => {},
  onApplyToWeek = () => {},
  compact = false,
}) {
  const [localSlots, setLocalSlots] = useState([]);
  const [activePreset, setActivePreset] = useState("Morning");
  const [fade, setFade] = useState(false); // for animation

  // when date changes, always load Morning preset by default
  useEffect(() => {
    if (date) {
      const morningPreset = presetSlots("Morning");
      setLocalSlots(morningPreset);
      setActivePreset("Morning");
    }
  }, [date]);

  // fade animation on preset change
  const applyPreset = (name) => {
    setFade(true);
    setTimeout(() => {
      const preset = presetSlots(name);
      setLocalSlots(preset);
      setActivePreset(name);
      setFade(false);
      toast.success(`${name} preset applied`);
    }, 200); // short fade duration
  };

  const toggleSlot = (time) => {
    const updated = localSlots.map((s) =>
      s.time === time ? { ...s, available: !s.available } : s
    );
    setLocalSlots(updated);
  };

  const selectAll = () => {
    setLocalSlots(localSlots.map((s) => ({ ...s, available: true })));
  };

  const deselectAll = () => {
    setLocalSlots(localSlots.map((s) => ({ ...s, available: false })));
  };

  const save = () => {
    onUpdate(localSlots);
    toast.success("Slots saved successfully");
  };

  const visibleSlots = localSlots.filter((s) => s.visible);

  return (
    <div
      className={`bg-white rounded shadow p-4 transition-all duration-200 ${
        compact ? "max-h-56 overflow-auto" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">{date || "Select a date"}</div>
          <div className="text-xs text-gray-500">Time slots</div>
        </div>

        <div className="flex gap-2">
          <button
            className="px-2 py-1 border rounded text-sm"
            onClick={onCopyPrevious}
          >
            Copy Prev Day
          </button>
          <button
            className="px-2 py-1 border rounded text-sm"
            onClick={() => onApplyToWeek()}
          >
            Apply to Week
          </button>
        </div>
      </div>

      {/* Preset buttons with highlight and smooth animation */}
      <div className="mt-3 flex gap-2 flex-wrap">
        {["Morning", "Evening", "Full Day"].map((preset) => (
          <button
            key={preset}
            className={`px-3 py-1 border rounded text-sm transition-all duration-200 ${
              activePreset === preset
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => applyPreset(preset)}
          >
            {preset}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
          onClick={selectAll}
        >
          Select All
        </button>
        <button
          className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
          onClick={deselectAll}
        >
          Deselect All
        </button>
      </div>

      {/* Animated slot list */}
      <div
        className={`mt-3 space-y-1 max-h-64 overflow-auto transition-opacity duration-300 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        {visibleSlots.length > 0 ? (
          visibleSlots.map((s) => (
            <SlotItem
              key={s.time}
              slot={s}
              onToggle={() => toggleSlot(s.time)}
            />
          ))
        ) : (
          <div className="text-sm text-gray-400 text-center py-4">
            No visible slots in this preset
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {visibleSlots.filter((s) => s.available && !s.booked).length}{" "}
          available • {visibleSlots.filter((s) => s.booked).length} booked
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border hover:bg-gray-100"
            onClick={() => setLocalSlots(presetSlots(activePreset))}
          >
            Reset
          </button>
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={save}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
