import React from "react";

export default function WeeklySummaryBar({
  weekStart,
  summary = {},
  onPrev = () => {},
  onNext = () => {},
}) {
  if (!weekStart && !summary) return null;

  const rangeText = weekStart
    ? (() => {
        const start = new Date(weekStart);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        const fmt = (d) =>
          `${d.getDate()} ${d.toLocaleString(undefined, { month: "short" })}`;
        return `${fmt(start)} - ${fmt(end)}`;
      })()
    : "";

  return (
    <div className="bg-white border-t p-3 flex items-center justify-between max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <button onClick={onPrev} className="px-3 py-1 border rounded">
          &lt;
        </button>
        <div className="text-sm font-medium">{rangeText}</div>
        <button onClick={onNext} className="px-3 py-1 border rounded">
          &gt;
        </button>
      </div>

      <div className="text-sm">
        Total Slots: {summary?.total ?? 0} | Booked: {summary?.booked ?? 0} |
        Available: {summary?.available ?? 0} | Holiday: {summary?.holiday ?? 0}
      </div>
    </div>
  );
}
