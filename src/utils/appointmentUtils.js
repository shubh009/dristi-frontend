/**
 * appointmentUtils.js
 */

import { format } from "date-fns"; // if you use date-fns, else use native

export function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return format(d, "dd MMM yyyy");
  } catch {
    return dateStr;
  }
}

export function formatTime(timeStr) {
  // timeStr like "10:30" or "10:30:00"
  const [h, m] = timeStr.split(":");
  if (!h) return timeStr;
  const hh = Number(h);
  const ampm = hh >= 12 ? "PM" : "AM";
  const display = `${((hh + 11) % 12) + 1}:${m.padStart(2, "0")} ${ampm}`;
  return display;
}

export function buildSlotDisplay(date, time) {
  return `${formatDate(date)} • ${formatTime(time)}`;
}
