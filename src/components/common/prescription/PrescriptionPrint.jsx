import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPrescriptionById } from "../../../services/prescriptionService";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import logo from "../../../assets/img/logo.jpeg"; // Replace with actual logo path

export default function PrescriptionPrint() {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef();

  // === Fetch Prescription ===
  useEffect(() => {
    fetchPrescription();
  }, [id]);

  const fetchPrescription = async () => {
    try {
      const data = await getPrescriptionById(id);
      setPrescription(data);
    } catch (error) {
      console.error("Error loading prescription:", error);
    } finally {
      setLoading(false);
    }
  };

  // === Print Handler ===
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Prescription_${id}`,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-sm">Preparing print layout...</p>
      </div>
    );
  }

  if (!prescription) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Prescription not found.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-gray-100 py-8 print:bg-white print:p-0">
      <div
        ref={printRef}
        className="bg-white w-[210mm] min-h-[297mm] shadow-lg border border-gray-300 p-8 print:border-0 print:shadow-none print:w-full"
      >
        {/* Clinic Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-6">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Clinic Logo"
              className="w-14 h-14 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Dristi Eye Care
              </h1>
              <p className="text-sm text-gray-600">
                Vision Beyond Limits | Agra, Uttar Pradesh
              </p>
            </div>
          </div>

          <div className="text-right text-sm text-gray-700">
            <p>
              <span className="font-medium">Doctor:</span>{" "}
              {prescription.doctor?.name || "Dr. [Name]"}
            </p>
            <p>{prescription.doctor?.reg}</p>
            <p>
              {prescription.doctor?.specialization ||
                "Consultant Ophthalmologist"}
            </p>
          </div>
        </div>

        {/* Patient Info */}
        <div className="border-b pb-2 mb-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <p>
              <span className="font-medium">Patient:</span>{" "}
              {prescription.patientName || "-"}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {prescription.date
                ? format(new Date(prescription.date), "dd MMM yyyy")
                : "-"}
            </p>
          </div>
        </div>

        {/* Medicines */}
        <section className="mb-5">
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">
            Medicines
          </h3>
          {prescription.medicines?.length ? (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left w-[40px]">#</th>
                  <th className="border p-2 text-left">Medicine</th>
                  <th className="border p-2 text-left">Dosage</th>
                  <th className="border p-2 text-left">Duration</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {prescription.medicines.map((m, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{idx + 1}</td>
                    <td className="border p-2">{m.name}</td>
                    <td className="border p-2">{m.dosage}</td>
                    <td className="border p-2">{m.duration}</td>
                    <td className="border p-2">{m.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-sm">No medicines prescribed.</p>
          )}
        </section>

        {/* Tests */}
        <section className="mb-5">
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">
            Recommended Tests
          </h3>
          {prescription.tests?.length ? (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 w-[40px] text-left">#</th>
                  <th className="border p-2 text-left">Test Name</th>
                  <th className="border p-2 text-left">Category</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {prescription.tests.map((t, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{idx + 1}</td>
                    <td className="border p-2">{t.name}</td>
                    <td className="border p-2">{t.category}</td>
                    <td className="border p-2">{t.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-sm">No tests recommended.</p>
          )}
        </section>

        {/* Comments / Advice */}
        {prescription.comments && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">
              Doctor's Comments / Advice
            </h3>
            <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
              {prescription.comments}
            </p>
          </section>
        )}

        {/* Footer / Signature */}
        <div className="mt-10 flex justify-between items-end">
          <div className="text-sm text-gray-500">
            <p>
              <strong>Clinic Address:</strong> 12A, Civil Lines, Agra, UP
            </p>
            <p>Contact: +91 81234 56789 | www.dristieyecare.in</p>
          </div>

          <div className="text-right">
            <p className="font-medium">
              {prescription.doctor?.name || "Doctor"}
            </p>
            <p className="text-sm">{prescription.doctor?.reg || ""}</p>
            <div className="mt-6 border-t border-gray-500 w-32 mx-auto"></div>
            <p className="text-xs text-gray-500 mt-1">Signature</p>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="mt-6 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-primary text-white px-6 py-2 rounded shadow hover:opacity-90"
          style={{ backgroundColor: "#af3233" }}
        >
          Print Prescription
        </button>
      </div>
    </div>
  );
}
