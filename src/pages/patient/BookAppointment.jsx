// src/components/patient/appointments/BookAppointment.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * BookAppointment.jsx
 *
 * Single-file, multi-step booking UI inspired by the wireframe:
 * - Left: horizontal date slider + time slots
 * - Right: review & confirm (on desktop)
 * - Mobile: stacked, confirm button sticky at bottom
 *
 * Dependencies:
 *   npm install framer-motion react-toastify
 *
 * Replace mockAvailability with a real API call when backend is ready.
 */

const primary = "bg-primary"; // Tailwind configured to use your theme colors
const primaryText = "text-primary";

function formatDay(date) {
  return date.toLocaleDateString(undefined, { weekday: "short" }); // Mon
}
function formatDateNum(date) {
  return date.getDate(); // 10
}
function formatDateLabel(date) {
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" }); // Oct 10
}

/** Create mock availability for next 14 days (for demo) */
function generateMockAvailability(days = 14) {
  const map = {};
  const now = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    // Make a key like YYYY-MM-DD
    const key = d.toISOString().slice(0, 10);

    // generate some times: vary by day
    const slots = [];
    const baseHours = [9, 10, 11, 13, 14, 15, 16];
    baseHours.forEach((h, idx) => {
      // randomly drop some slots
      if ((i + idx) % 3 !== 0) {
        const minute = idx % 2 === 0 ? "00" : "30";
        const hour = h;
        const t = new Date(d);
        t.setHours(hour, Number(minute));
        const label = t.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
        });
        slots.push(label);
      }
    });

    // keep weekends lighter (fewer slots)
    if (d.getDay() === 0 || d.getDay() === 6) {
      map[key] = slots.slice(0, Math.max(1, Math.floor(slots.length / 2)));
    } else {
      map[key] = slots;
    }
  }
  return map;
}

export default function BookAppointment() {
  const mockAvailability = useMemo(() => generateMockAvailability(21), []);
  const [step, setStep] = useState(1);

  // booking state
  const [service, setService] = useState("");
  const [selectedDateISO, setSelectedDateISO] = useState(null); // YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // services list
  const services = [
    "Eye Checkup",
    "Cataract Consultation",
    "Glaucoma Screening",
    "LASIK Evaluation",
    "Retina Examination",
    "Contact Lens Fitting",
    "Pediatric Eye Exam",
    "Emergency Eye Care",
    "dry Eye Treatment",
    "diabetic Eye Exam",
    "Other",
  ];

  // derived list of dates (objects) from mockAvailability
  const dates = useMemo(() => {
    return Object.keys(mockAvailability).map((iso) => {
      const d = new Date(iso);
      return {
        iso,
        dateObj: d,
        dayShort: formatDay(d),
        dateNum: formatDateNum(d),
        label: formatDateLabel(d),
      };
    });
  }, [mockAvailability]);

  useEffect(() => {
    // set initial selected date to first available if not set
    if (!selectedDateISO && dates.length) {
      setSelectedDateISO(dates[0].iso);
    }
  }, [dates, selectedDateISO]);

  function handleSelectSlot(time) {
    setSelectedTime(time);
  }

  function handleConfirmBooking() {
    if (!service) {
      toast.error("Please select a service", {
        position: "bottom-center",
      });
      return;
    }
    if (!selectedDateISO || !selectedTime) {
      toast.error("Please choose a date and time", {
        position: "bottom-center",
      });
      return;
    }

    setLoading(true);
    // simulate server booking
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setStep(4);
      toast.success("Appointment confirmed!", { position: "bottom-center" });
    }, 1400);
  }

  function resetAndBookAnother() {
    setService("Eye Checkup");
    setSelectedTime(null);
    setSelectedDateISO(dates[0]?.iso || null);
    setSuccess(false);
    setStep(1);
  }

  // For responsive layout: on mobile, keep confirm button sticky at bottom
  // Component UI
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
        {/* LEFT: Dates + Times (desktop) */}
        <div className="md:w-2/3 p-6 border-b md:border-b-0 md:border-r">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="mt-2 md:mt-0 flex flex-col">
              <label className="text-lg font-bold text-gray-700 mr-3">
                Book Appointment For
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="border rounded-md px-3 py-2 text-md mt-2"
              >
                <option value="" disabled>
                  -- Select a Service --
                </option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary">
                Choose Date & Time
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Select an available slot for the doctor
              </p>
            </div>
          </div>

          {/* Horizontal date slider */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-md font-semibold text-black">Choose a date</p>
              <p className="text-sm text-gray-500 ">
                {selectedDateISO
                  ? new Date(selectedDateISO).toLocaleDateString()
                  : ""}
              </p>
            </div>

            <div className="overflow-x-auto no-scrollbar py-2 -mx-4 px-4">
              <div className="flex gap-3">
                {dates.map((d) => {
                  const isSelected = d.iso === selectedDateISO;
                  return (
                    <button
                      key={d.iso}
                      onClick={() => {
                        setSelectedDateISO(d.iso);
                        setSelectedTime(null); // reset time when date changes
                        // if on step 1, go to step 2
                        if (step === 1) setStep(2);
                      }}
                      className={`min-w-[88px] flex-shrink-0 rounded-lg p-3 text-center transition ${
                        isSelected
                          ? "bg-primary-gradient text-black shadow-md"
                          : "bg-gray-50 border border-gray-200 hover:border-primary"
                      }`}
                    >
                      <div className="text-xs">{d.dayShort}</div>
                      <div className="text-lg font-semibold mt-1">
                        {d.dateNum}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 hidden sm:block">
                        {d.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Time slots */}
          <div className="mt-6">
            <p className="text-md font-semibold text-black mb-3">
              Available time slots
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {selectedDateISO &&
              mockAvailability[selectedDateISO] &&
              mockAvailability[selectedDateISO].length > 0 ? (
                mockAvailability[selectedDateISO].map((t) => {
                  const selected = selectedTime === t;
                  return (
                    <button
                      key={t}
                      onClick={() => {
                        handleSelectSlot(t);
                        setStep(3); // jump to review step on time select
                      }}
                      className={`px-3 py-2 rounded-md text-sm transition text-center ${
                        selected
                          ? "bg-primary-gradient text-black shadow-md font-bold"
                          : "bg-gray-50 border border-gray-200 hover:border-primary"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })
              ) : (
                <div className="col-span-full text-gray-500">
                  No slots available on this date
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Review & Confirm */}
        <div className="md:w-1/3 p-6 flex flex-col gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Review</h4>
            <p className="text-sm text-gray-500 mt-1">
              Confirm your appointment details
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Patient</div>
            <div className="font-medium text-gray-800">You (Patient Name)</div>

            <div className="mt-3 text-sm text-gray-600">Service</div>
            <div className="font-medium text-gray-800">{service}</div>

            <div className="mt-3 text-sm text-gray-600">Date</div>
            <div className="font-medium text-gray-800">
              {selectedDateISO
                ? new Date(selectedDateISO).toLocaleDateString()
                : "—"}
            </div>

            <div className="mt-3 text-sm text-gray-600">Time</div>
            <div className="font-medium text-gray-800">
              {selectedTime || "—"}
            </div>
          </div>

          <div className="mt-auto">
            <button
              onClick={() => {
                if (!selectedDateISO || !selectedTime) {
                  toast.error("Please select date and time", {
                    position: "bottom-center",
                  });
                  return;
                }
                handleConfirmBooking();
              }}
              disabled={loading || success}
              className={`w-full py-2 rounded-full text-white text-xl font-semibold transition ${
                loading || success
                  ? "opacity-60 cursor-not-allowed"
                  : "bg-primary shadow-md hover:brightness-95"
              }`}
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Booking...
                </span>
              ) : success ? (
                "Booked"
              ) : (
                "Confirm Booking"
              )}
            </button>

            {/* Code for re start the step process for future */}
            {/* <button
              onClick={() => {
                // go back to time selection
                setStep(1);
              }}
              className="w-full mt-3 py-2 rounded-md text-sm border border-gray-200"
            >
              Edit Selection
            </button> */}
          </div>

          {/* Success panel */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center bg-white/90 p-6"
              >
                <div className="text-center">
                  <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">
                    Appointment Confirmed
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    You will get a confirmation message shortly.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() =>
                        (window.location.href = "/patient/appointments")
                      }
                      className="px-4 py-2 rounded-md border border-gray-200"
                    >
                      View Appointments
                    </button>
                    <button
                      onClick={resetAndBookAnother}
                      className="px-4 py-2 rounded-md bg-primary text-white"
                    >
                      Book Another
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile sticky confirm bar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden w-[92%]">
        <div className="bg-white p-3 rounded-full shadow-lg flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="text-xs text-gray-500">Selected</div>
            <div className="text-sm font-medium">
              {selectedDateISO
                ? new Date(selectedDateISO).toLocaleDateString()
                : "No date"}{" "}
              • {selectedTime || "No time"}
            </div>
          </div>
          <button
            onClick={() => {
              if (!service) {
                toast.error("Please select a service", {
                  position: "bottom-center",
                });
                return;
              }
              if (!selectedDateISO || !selectedTime) {
                toast.error("Please select date and time", {
                  position: "bottom-center",
                });
                return;
              }
              handleConfirmBooking();
            }}
            disabled={loading || success}
            className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            {loading ? "Booking..." : success ? "Booked" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
