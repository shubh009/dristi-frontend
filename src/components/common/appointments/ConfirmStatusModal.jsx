import React, { useState } from "react";
import Modal from "../ui-components/modal/Modal";

export default function ConfirmStatusModal({
  isOpen,
  onClose,
  appointment,
  onConfirm,
}) {
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm(appointment);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!appointment) return null;
  return (
    <Modal isOpen={isOpen} title="Confirm Appointment" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <div className="font-medium">{appointment.patientName}</div>
          <div className="text-sm text-gray-500">{appointment.phone}</div>
          <div className="text-sm text-gray-700 mt-2">
            Slot: {appointment.slotDisplay}
          </div>
          {appointment.notes && (
            <div className="text-sm mt-1">Notes: {appointment.notes}</div>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-md border">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-md text-white"
            style={{ backgroundColor: "#af3233eb" }}
          >
            {loading ? "Confirming..." : "Confirm Appointment"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
