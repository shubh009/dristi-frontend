import React, { useEffect, useState } from "react";
import ScheduleHeader from "../../components/schedule/ScheduleHeader";
import CalendarGrid from "../../components/schedule/CalendarGrid";
import SlotPanel from "../../components/schedule/SlotPanel";
import WeeklySummaryBar from "../../components/schedule/WeeklySummaryBar";
import { getNextNDays } from "../../utils/dateUtils";
import {
  generateDefaultSlotsForDay,
  summarizeWeek,
} from "../../utils/slotUtils";
import scheduleService from "../../services/scheduleService";

export default function SchedulePage() {
  const [doctorId] = useState(1); // single doctor MVP
  const [dates, setDates] = useState([]); // array of date strings for 90 days
  const [scheduleData, setScheduleData] = useState({}); // { '2025-10-17': { slots: [...] } }
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(null);
  const [weeklySummary, setWeeklySummary] = useState(null);

  useEffect(() => {
    const dd = getNextNDays(90);
    setDates(dd);
    // fetch schedule (mock)
    scheduleService.getSchedule(doctorId).then((remote) => {
      // remote: { dateStr: { slots } }
      // ensure all dates exist
      const data = {};
      dd.forEach((d) => {
        data[d] = remote[d] ?? { slots: generateDefaultSlotsForDay(d) };
      });
      setScheduleData(data);
      // default selected date = today
      setSelectedDate(dd[0]);
      // set current week start (first day of week for selectedDate)
      setCurrentWeekStart(getWeekStart(dd[0]));
    });
    // helper
    function getWeekStart(dateStr) {
      const d = new Date(dateStr);
      const day = d.getDay(); // Sunday=0
      const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as week start
      const monday = new Date(d.setDate(diff));
      return formatDate(monday);
    }
    function formatDate(dt) {
      const y = dt.getFullYear();
      const m = String(dt.getMonth() + 1).padStart(2, "0");
      const d = String(dt.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
  }, [doctorId]);

  useEffect(() => {
    if (!selectedDate) return;
    // update weekly summary based on selectedDate's week
    const weekStart = getWeekStart(selectedDate);
    setCurrentWeekStart(weekStart);
    const weekDates = getWeekRange(weekStart);
    const summary = summarizeWeek(weekDates, scheduleData);
    setWeeklySummary({ weekStart, weekDates, summary });
  }, [selectedDate, scheduleData]);

  // helpers for week
  function getWeekStart(dateStr) {
    const d = new Date(dateStr);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
    const monday = new Date(d.setDate(diff));
    return formatDate(monday);
  }
  function getWeekRange(weekStartStr) {
    const arr = [];
    const base = new Date(weekStartStr);
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      arr.push(formatDate(d));
    }
    return arr;
  }
  function formatDate(dt) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  }

  // slot toggle called from SlotPanel -> updates scheduleData
  const updateSlotsForDate = (dateStr, newSlots) => {
    setScheduleData((prev) => {
      const copy = { ...prev, [dateStr]: { slots: newSlots } };
      // optionally persist to server (optimistic)
      scheduleService.updateSlots(doctorId, dateStr, newSlots);
      return copy;
    });
  };

  // navigate week for carousel
  const moveWeek = (direction) => {
    if (!currentWeekStart) return;
    const base = new Date(currentWeekStart);
    base.setDate(base.getDate() + (direction === "next" ? 7 : -7));
    const nextWeekStart = formatDate(base);
    const weekDates = getWeekRange(nextWeekStart);
    const summary = summarizeWeek(weekDates, scheduleData);
    setWeeklySummary({ weekStart: nextWeekStart, weekDates, summary });
    // optionally set selected to first day of that week
    setSelectedDate(weekDates[0]);
    setCurrentWeekStart(nextWeekStart);
  };

  // Copy previous day (helper used inside SlotPanel)
  const copyPreviousDay = (dateStr) => {
    const prev = new Date(dateStr);
    prev.setDate(prev.getDate() - 1);
    const prevStr = formatDate(prev);
    if (!scheduleData[prevStr]) return;
    updateSlotsForDate(
      dateStr,
      scheduleData[prevStr].slots.map((s) => ({ ...s }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <ScheduleHeader
          onApplyTemplate={(preset) => {
            if (!selectedDate) return toast.error("Select a date first.");
            const slots = slotPresetToSlots(preset);
            updateSlotsForDate(selectedDate, slots);
          }}
          onAddBreakConfirm={(start, end) => {
            if (!selectedDate) return toast.error("Select a date first.");
            const slots = scheduleData[selectedDate].slots.map((s) =>
              s.time >= start && s.time < end ? { ...s, available: false } : s
            );
            updateSlotsForDate(selectedDate, slots);
          }}
          onMarkLeaveConfirm={() => {
            if (!selectedDate) return toast.error("Select a date first.");
            const slots = scheduleData[selectedDate].slots.map((s) => ({
              ...s,
              available: false,
              booked: false,
            }));
            updateSlotsForDate(selectedDate, slots);
          }}
          onBulkEditConfirm={(start, end) => {
            if (!selectedDate) return toast.error("Select a date first.");
            const startDate = new Date(start);
            const endDate = new Date(end);
            const curSlots = scheduleData[selectedDate]?.slots || [];
            const loop = new Date(startDate);
            while (loop <= endDate) {
              const key = formatDate(loop);
              updateSlotsForDate(
                key,
                curSlots.map((s) => ({ ...s }))
              );
              loop.setDate(loop.getDate() + 1);
            }
          }}
        />

        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <CalendarGrid
              dates={dates}
              scheduleData={scheduleData}
              selectedDate={selectedDate}
              onSelectDate={(d) => setSelectedDate(d)}
            />
          </div>
          <div className="w-96 hidden lg:block">
            <SlotPanel
              date={selectedDate}
              slots={
                (scheduleData[selectedDate] &&
                  scheduleData[selectedDate].slots) ||
                []
              }
              onUpdate={(newSlots) =>
                updateSlotsForDate(selectedDate, newSlots)
              }
              onCopyPrevious={() => copyPreviousDay(selectedDate)}
              onApplyToWeek={(applyToWeekFn) => {
                // example: apply current day's slots to all days in current week
                const week = getWeekRange(currentWeekStart);
                const curSlots = scheduleData[selectedDate].slots;
                week.forEach((d) =>
                  updateSlotsForDate(
                    d,
                    curSlots.map((s) => ({ ...s }))
                  )
                );
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile bottom drawer for slot panel */}
      <div className="lg:hidden fixed inset-x-0 bottom-16">
        <div className="mx-4">
          <SlotPanel
            compact
            date={selectedDate}
            slots={
              (scheduleData[selectedDate] &&
                scheduleData[selectedDate].slots) ||
              []
            }
            onUpdate={(newSlots) => updateSlotsForDate(selectedDate, newSlots)}
            onCopyPrevious={() => copyPreviousDay(selectedDate)}
            onApplyToWeek={() => {
              const week = getWeekRange(currentWeekStart);
              const curSlots = scheduleData[selectedDate]?.slots || [];
              week.forEach((d) =>
                updateSlotsForDate(
                  d,
                  curSlots.map((s) => ({ ...s }))
                )
              );
            }}
          />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0">
        <WeeklySummaryBar
          weekStart={weeklySummary?.weekStart}
          summary={weeklySummary?.summary}
          onPrev={() => moveWeek("prev")}
          onNext={() => moveWeek("next")}
        />
      </div>
    </div>
  );
}

// small helper to build preset slots quickly (uses utils)
import { presetSlots } from "../../utils/slotUtils";
function slotPresetToSlots(name) {
  return presetSlots(name);
}
