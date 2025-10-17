// src/utils/slotUtils.js

// Generates default 30-min slots from 9:00 AM - 8:00 PM
export function generateDefaultSlotsForDay(dateStr, start = "09:00", end = "20:00", interval = 30) {
  const slots = [];
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  let cur = sh * 60 + sm;
  const endMin = eh * 60 + em;
  while (cur < endMin) {
    const hh = Math.floor(cur / 60);
    const mm = cur % 60;
    const timeLabel = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    slots.push({
      time: timeLabel,
      available: true,
      booked: false,
      visible: true, // all visible by default
    });
    cur += interval;
  }
  return slots;
}

export function presetSlots(name) {
  const all = generateDefaultSlotsForDay();

  // Convert time string (HH:MM) to minutes for easier comparison
  const toMin = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  if (name === "Morning") {
    const start = toMin("11:00");
    const end = toMin("14:00");
    return all.map((s) => {
      const t = toMin(s.time);
      return {
        ...s,
        available: t >= start && t < end,
        visible: t >= start && t < end, // visible only in morning range
      };
    });
  }

  if (name === "Evening") {
    const start = toMin("17:00");
    const end = toMin("20:00");
    return all.map((s) => {
      const t = toMin(s.time);
      return {
        ...s,
        available: t >= start && t < end,
        visible: t >= start && t < end, // visible only in evening range
      };
    });
  }

  // Full Day (show all)
  return all.map((s) => ({
    ...s,
    available: true,
    visible: true,
  }));
}

export function summarizeWeek(weekDates = [], scheduleData = {}) {
  let total = 0, booked = 0, available = 0, holiday = 0;
  weekDates.forEach((d) => {
    const day = scheduleData[d];
    if (!day || !day.slots) {
      holiday += 1;
      return;
    }
    const visibleSlots = day.slots.filter((s) => s.visible);
    if (!visibleSlots.length) {
      holiday += 1;
      return;
    }
    total += visibleSlots.length;
    booked += visibleSlots.filter((s) => s.booked).length;
    available += visibleSlots.filter((s) => s.available && !s.booked).length;
  });
  return { total, booked, available, holiday };
}
