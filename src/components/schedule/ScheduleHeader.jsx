import React, { useState } from "react";
import Modal from "../../components/common/ui-components/modal/Modal";
import toast from "react-hot-toast";

export default function ScheduleHeader({
  onApplyTemplate = () => {},
  onAddBreakConfirm = () => {},
  onMarkLeaveConfirm = () => {},
  onBulkEditConfirm = () => {},
}) {
  const [showTemplates, setShowTemplates] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const [breakStart, setBreakStart] = useState("");
  const [breakEnd, setBreakEnd] = useState("");
  const [bulkRangeStart, setBulkRangeStart] = useState("");
  const [bulkRangeEnd, setBulkRangeEnd] = useState("");

  return (
    <div className="flex items-center justify-between relative">
      <h1 className="text-2xl font-semibold">Doctor Schedule</h1>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {/* Apply Template */}
        <div className="relative">
          <button
            className="px-3 py-2 rounded border bg-white text-sm"
            onClick={() => setShowTemplates(!showTemplates)}
          >
            Apply Template
          </button>
          {showTemplates && (
            <div className="absolute right-0 mt-1 bg-white border rounded shadow text-sm z-20">
              {["Morning", "Evening", "Full Day"].map((t) => (
                <button
                  key={t}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                  onClick={() => {
                    onApplyTemplate(t);
                    setShowTemplates(false);
                    toast.success(`${t} template applied successfully`);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add Break */}
        <button
          className="px-3 py-2 rounded border bg-white text-sm"
          onClick={() => setShowBreakModal(true)}
        >
          Add Break
        </button>

        {/* Mark Leave */}
        <button
          className="px-3 py-2 rounded border bg-white text-sm"
          onClick={() => setShowLeaveModal(true)}
        >
          Mark Leave Day
        </button>

        {/* Bulk Edit */}
        <button
          className="px-3 py-2 rounded border bg-white text-sm"
          onClick={() => setShowBulkModal(true)}
        >
          Bulk Edit
        </button>
      </div>

      {/* Add Break Modal */}
      <Modal
        title="Add Break Time"
        isOpen={showBreakModal}
        onClose={() => setShowBreakModal(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!breakStart || !breakEnd)
              return toast.error("Please select both start and end time");
            onAddBreakConfirm(breakStart, breakEnd);
            toast.success(`Break added: ${breakStart} - ${breakEnd}`);
            setBreakStart("");
            setBreakEnd("");
            setShowBreakModal(false);
          }}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Start Time</label>
              <input
                type="time"
                className="border rounded w-full px-3 py-2 mt-1 text-sm"
                value={breakStart}
                onChange={(e) => setBreakStart(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">End Time</label>
              <input
                type="time"
                className="border rounded w-full px-3 py-2 mt-1 text-sm"
                value={breakEnd}
                onChange={(e) => setBreakEnd(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded mt-2"
            >
              Add Break
            </button>
          </div>
        </form>
      </Modal>

      {/* Mark Leave Modal */}
      <Modal
        title="Mark Leave Day"
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
      >
        <p className="text-sm mb-4">
          Are you sure you want to mark the selected day as leave?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-2 border rounded"
            onClick={() => setShowLeaveModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 bg-red-500 text-white rounded"
            onClick={() => {
              onMarkLeaveConfirm();
              toast.success("Leave day marked successfully!");
              setShowLeaveModal(false);
            }}
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Bulk Edit Modal */}
      <Modal
        title="Bulk Edit Dates"
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!bulkRangeStart || !bulkRangeEnd)
              return toast.error("Please select both start and end dates");
            onBulkEditConfirm(bulkRangeStart, bulkRangeEnd);
            toast.success("Bulk edit applied successfully");
            setBulkRangeStart("");
            setBulkRangeEnd("");
            setShowBulkModal(false);
          }}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                className="border rounded w-full px-3 py-2 mt-1 text-sm"
                value={bulkRangeStart}
                onChange={(e) => setBulkRangeStart(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                className="border rounded w-full px-3 py-2 mt-1 text-sm"
                value={bulkRangeEnd}
                onChange={(e) => setBulkRangeEnd(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded mt-2"
            >
              Apply Bulk Edit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
