import React from "react";
import DateCard from "./DateCard";

export default function CalendarGrid({
  dates = [],
  scheduleData = {},
  selectedDate,
  onSelectDate,
}) {
  // show three months grouped - simple chunking
  const months = [];
  for (let i = 0; i < 3; i++) months.push(dates.slice(i * 30, (i + 1) * 30));

  return (
    <div className="space-y-4">
      {months.map((month, idx) => (
        <div key={idx}>
          <div className="text-sm font-medium mb-2">Month {idx + 1}</div>
          <div className="grid grid-cols-7 gap-2">
            {month.map((d) => (
              <DateCard
                key={d}
                dateStr={d}
                slots={scheduleData[d]?.slots || []}
                isSelected={d === selectedDate}
                onClick={() => onSelectDate(d)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
