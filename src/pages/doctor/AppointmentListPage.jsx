import React, { useEffect, useState, useRef } from "react";
import ResponsiveDataTable from "../../components/common/ui-components/tables/ResponsiveDataTable";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmStatusModal from "../../components/common/appointments/ConfirmStatusModal";
import RescheduleModal from "./../../components/common/appointments/RescheduleModal";
import * as appointmentService from "../../services/appointmentService";
import { buildSlotDisplay, formatDate } from "../../utils/appointmentUtils";

/**
 * AppointmentListPage.jsx
 * Full feature page: list, confirm, reschedule, print receipt
 */

export default function AppointmentListPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);

  const printRef = useRef();

  useEffect(() => {
    load();
    // optionally, you could poll or websocket subscribe here
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await appointmentService.fetchAppointments();
      // enhance each row for UI and actions
      const enriched = data.map((d) => ({
        ...d,
        slotDisplay: buildSlotDisplay(d.date, d.time),
        createdAtDisplay: d.createdAt ? formatDate(d.createdAt) : "",
        statusBadge: <StatusBadge status={d.status} />,
        _actions: [
          {
            id: "confirm",
            label: d.status === "Confirmed" ? "Mark Complete" : "Confirm",
          },
          { id: "reschedule", label: "Reschedule" },
          { id: "view", label: "View" },
        ],
      }));
      setAppointments(enriched);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRowAction(row, actionId) {
    setSelected(row);
    if (actionId === "confirm") {
      setConfirmOpen(true);
    } else if (actionId === "reschedule") {
      setRescheduleOpen(true);
    } else if (actionId === "view") {
      // open quick view - reuse Confirm modal as read-only or make a view modal
      setConfirmOpen(true);
    }
  }

  async function handleConfirm(appointment) {
    // toggle to Confirmed or Completed depending on existing status
    const newStatus =
      appointment.status === "Confirmed" ? "Completed" : "Confirmed";
    const updated = await appointmentService.updateAppointmentStatus(
      appointment.id,
      newStatus
    );
    // optimistic update
    setAppointments((prev) =>
      prev.map((p) =>
        p.id === appointment.id ? { ...p, status: newStatus } : p
      )
    );

    // After confirming, prepare and trigger print receipt
    if (newStatus === "Confirmed") {
      // wait for state to update, then trigger print
      // printReceipt uses a ref to printable area
      setTimeout(() => {
        triggerPrint(appointment.id);
      }, 300);
    }
    return updated;
  }

  async function handleReschedule(appointment, { date, time }) {
    const res = await appointmentService.rescheduleAppointment(appointment.id, {
      date,
      time,
    });
    setAppointments((prev) =>
      prev.map((p) =>
        p.id === appointment.id
          ? { ...p, date, time, slotDisplay: buildSlotDisplay(date, time) }
          : p
      )
    );
    return res;
  }

  function triggerPrint(appointmentId) {
    // Mark which appointment to print
    const appt = appointments.find((a) => a.id === appointmentId) || selected;
    if (!appt) return;
    // render print content into hidden area and call window.print()
    // We'll set printRef.current to the selected appointment data before printing
    printRef.current = appt;
    // Create a print window with small inline template (simpler cross-browser)
    const printHtml = buildPrintHtml(appt);
    const w = window.open("", "_blank", "width=600,height=800");
    if (!w) return;
    w.document.write(printHtml);
    w.document.close();
    w.focus();
    // give browser a tick to render
    setTimeout(() => {
      w.print();
      w.close();
    }, 500);
  }

  function buildPrintHtml(appt) {
    // Simple, print-optimized HTML template. Replace with prettier layout or PDF generator server-side if needed.
    return `
      <html>
        <head>
          <title>Appointment Receipt</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding:20px; }
            .header { display:flex; justify-content:space-between; align-items:center; }
            .clinic { font-weight:700; color: #af3233eb; font-size:18px; }
            .meta { font-size:14px; color:#333; }
            .box { margin-top:14px; border:1px solid #eee; padding:12px; border-radius:8px; }
            .key { color:#666; font-size:13px; }
            .val { font-weight:600; margin-top:6px; font-size:15px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="clinic">Dristi Eye Care</div>
              <div class="meta">OPD Appointment Receipt</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:12px;color:#777;">${new Date().toLocaleString()}</div>
            </div>
          </div>

          <div class="box">
            <div class="key">Patient</div>
            <div class="val">${appt.patientName} (${appt.phone})</div>

            <div style="height:8px;"></div>

            <div class="key">Slot</div>
            <div class="val">${appt.slotDisplay}</div>

            <div style="height:8px;"></div>

            <div class="key">Doctor</div>
            <div class="val">${appt.doctor || "—"}</div>

            <div style="height:8px;"></div>

            <div class="key">Status</div>
            <div class="val">${appt.status}</div>

            <div style="height:14px;"></div>

            <div style="font-size:12px;color:#555;">Notes: ${
              appt.notes || "—"
            }</div>
          </div>

          <div style="margin-top:20px;font-size:12px;color:#888;">
            Please arrive 10 minutes before your scheduled slot. Carry previous prescriptions if any.
          </div>
        </body>
      </html>
    `;
  }

  const columns = [
    {
      key: "patientName",
      label: "Patient",
      render: (r) => (
        <div className="font-medium">
          {r.patientName}
          <div className="text-xs text-gray-500">{r.phone}</div>
        </div>
      ),
    },
    {
      key: "slot",
      label: "Slot",
      render: (r) => <div className="text-sm">{r.slotDisplay}</div>,
    },
    {
      key: "doctor",
      label: "Doctor",
      render: (r) => <div className="text-sm">{r.doctor || "-"}</div>,
    },
    {
      key: "status",
      label: "Status",
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => handleRowAction(r, "confirm")}
            className="px-2 py-1 rounded-md text-white text-sm"
            style={{ backgroundColor: "#af3233eb" }}
          >
            {r.status === "Confirmed" ? "Complete" : "Confirm"}
          </button>
          <button
            onClick={() => handleRowAction(r, "reschedule")}
            className="px-2 py-1 rounded-md border text-sm"
          >
            Reschedule
          </button>
          <button
            onClick={() => triggerPrint(r.id)}
            className="px-2 py-1 rounded-md border text-sm"
          >
            Print
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Appointments</h1>
            <div className="text-sm text-gray-500">
              Manage today's and upcoming appointments
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: "#4babce" }}
              onClick={() => load()}
            >
              Refresh
            </button>
          </div>
        </div>

        <div>
          {loading ? (
            <div className="text-center py-16 text-gray-500">Loading...</div>
          ) : (
            <ResponsiveDataTable
              title="Appointment List"
              columns={[
                { key: "patientName", label: "Patient" },
                { key: "slotDisplay", label: "Slot" },
                { key: "doctor", label: "Doctor" },
                { key: "status", label: "Status" },
              ]}
              data={appointments}
              searchableKeys={["patientName", "phone", "doctor"]}
              sortableKeys={["patientName", "date", "status"]}
              loading={loading}
              onView={(row) => {
                setSelected(row);
                setConfirmOpen(true);
              }}
              onEdit={(row) => {
                setSelected(row);
                setRescheduleOpen(true);
              }}
              // onDelete={(row) => {
              //   // optional, can trigger cancel logic or print for now
              //   triggerPrint(row.id);
              // }}
            />
          )}
        </div>
      </div>

      <ConfirmStatusModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        appointment={selected}
        onConfirm={handleConfirm}
      />
      <RescheduleModal
        isOpen={rescheduleOpen}
        onClose={() => setRescheduleOpen(false)}
        appointment={selected}
        onReschedule={handleReschedule}
      />
    </div>
  );
}
