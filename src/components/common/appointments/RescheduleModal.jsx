import React, { useState } from "react";
import Modal from "../ui-components/modal/Modal";

export default function RescheduleModal({
  isOpen,
  onClose,
  appointment,
  onReschedule,
}) {
  const [date, setDate] = useState(appointment?.date || "");
  const [time, setTime] = useState(appointment?.time || "");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (appointment) {
      setDate(appointment.date || "");
      setTime(appointment.time || "");
    }
  }, [appointment]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await onReschedule(appointment, { date, time });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!appointment) return null;

  return (
    <Modal isOpen={isOpen} title="Reschedule Appointment" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600">New date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 border rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">New time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 border rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md text-white"
            style={{ backgroundColor: "#4babce" }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
