import React, { useState, useRef } from "react";
import PrescriptionHeader from "./partials/PrescriptionHeader";
import MedicineRow from "./partials/MedicineRow";
import TestRow from "./partials/TestRow";
import "../../common/prescription/style/prescription.css";

export default function PrescriptionForm() {
  // === States ===
  const [patientName, setPatientName] = useState("");
  const [doctor] = useState({ name: "Dr. Jane Smith" });
  const [date] = useState(new Date().toISOString().slice(0, 10));

  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "", notes: "" },
  ]);
  const [tests, setTests] = useState([{ name: "", category: "", notes: "" }]);
  const [comments, setComments] = useState("");

  const printableRef = useRef();

  // === Handlers ===
  const addMedicine = () =>
    setMedicines((prev) => [
      ...prev,
      { name: "", dosage: "", duration: "", notes: "" },
    ]);
  const updateMedicine = (i, val) =>
    setMedicines((prev) => prev.map((row, idx) => (idx === i ? val : row)));
  const removeMedicine = (i) =>
    setMedicines((prev) => prev.filter((_, idx) => idx !== i));

  const addTest = () =>
    setTests((prev) => [...prev, { name: "", category: "", notes: "" }]);
  const updateTest = (i, val) =>
    setTests((prev) => prev.map((row, idx) => (idx === i ? val : row)));
  const removeTest = (i) =>
    setTests((prev) => prev.filter((_, idx) => idx !== i));

  const handleSave = () => {
    const payload = {
      patientName,
      doctor,
      date,
      medicines,
      tests,
      comments,
    };
    console.log("Save prescription:", payload);
    alert("Prescription saved successfully (stub)");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCancel = () => {
    if (confirm("Discard all changes?")) {
      setPatientName("");
      setMedicines([{ name: "", dosage: "", duration: "", notes: "" }]);
      setTests([{ name: "", category: "", notes: "" }]);
      setComments("");
    }
  };

  const isMobile = window.innerWidth < 640;

  // === Render ===
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-6xl mx-auto bg-white p-10 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Create Prescription</h2>
        <hr className="mb-6" />

        {/* Header */}
        <PrescriptionHeader
          patientName={patientName}
          setPatientName={setPatientName}
          doctor={doctor}
          date={date}
        />

        {/* Medicines */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Medicines</h3>
          {medicines.map((m, idx) => (
            <MedicineRow
              key={idx}
              idx={idx}
              row={m}
              onChange={updateMedicine}
              onRemove={removeMedicine}
              isMobile={isMobile}
            />
          ))}
          <div className="text-right">
            <button
              onClick={addMedicine}
              className="border px-4 py-2 rounded hover:bg-gray-50"
            >
              + Add Medicine
            </button>
          </div>
        </section>

        {/* Doctor Comments */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Doctor's Comments / Advice
          </h3>
          <textarea
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Follow-up instructions, warnings, etc."
          />
        </section>

        {/* Tests */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Recommended Tests</h3>
          {tests.map((t, idx) => (
            <TestRow
              key={idx}
              idx={idx}
              row={t}
              onChange={updateTest}
              onRemove={removeTest}
              isMobile={isMobile}
            />
          ))}
          <div className="text-right">
            <button
              onClick={addTest}
              className="border px-4 py-2 rounded hover:bg-gray-50"
            >
              + Add Test
            </button>
          </div>
        </section>

        {/* Actions (merged inside form) */}
        <div className="mt-8 flex flex-wrap justify-end gap-3 border-t pt-4">
          <button
            onClick={handleSave}
            className="px-5 py-2 text-white rounded"
            style={{ backgroundColor: "#af3233" }}
          >
            Save Prescription
          </button>
          <button
            onClick={handlePrint}
            className="border px-5 py-2 rounded hover:bg-gray-50"
          >
            Print
          </button>
          <button
            onClick={handleCancel}
            className="border px-5 py-2 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
