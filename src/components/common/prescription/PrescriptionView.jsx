import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPrescriptionById } from "../../../services/prescriptionService/";
import { FiPrinter, FiArrowLeft } from "react-icons/fi";
import { format } from "date-fns";

export default function PrescriptionView() {
  const { id } = useParams(); // get prescription id from route
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescription();
  }, [id]);

  const fetchPrescription = async () => {
    try {
      const data = await getPrescriptionById(id);
      setPrescription(data);
    } catch (error) {
      console.error("Error fetching prescription:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-sm">Loading prescription...</p>
      </div>
    );
  }

  if (!prescription) {
    return (
      <div className="flex flex-col items-center min-h-[60vh] justify-center">
        <p className="text-gray-500">Prescription not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 px-4 py-2 border rounded text-sm hover:bg-gray-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow relative print:shadow-none print:bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-start border-b pb-3 mb-4 print:border-none">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {prescription.doctor?.name || "Dr. [Name]"}
          </h1>
          <p className="text-sm text-gray-600">{prescription.doctor?.reg}</p>
          <p className="text-sm text-gray-600">Dristi Eye Care</p>
        </div>

        <div className="text-right text-sm text-gray-600">
          <p>
            <span className="font-medium">Date:</span>{" "}
            {prescription.date
              ? format(new Date(prescription.date), "dd MMM yyyy")
              : "-"}
          </p>
          <p>
            <span className="font-medium">Patient:</span>{" "}
            {prescription.patientName || "-"}
          </p>
        </div>
      </div>

      {/* Medicines Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b pb-1 mb-3">Medicines</h3>
        {prescription.medicines?.length ? (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">#</th>
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

      {/* Recommended Tests Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold border-b pb-1 mb-3">
          Recommended Tests
        </h3>
        {prescription.tests?.length ? (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">#</th>
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

      {/* Comments Section */}
      {prescription.comments && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold border-b pb-1 mb-3">
            Doctor's Comments / Advice
          </h3>
          <p className="text-gray-700 whitespace-pre-line">
            {prescription.comments}
          </p>
        </section>
      )}

      {/* Footer / Signature */}
      <div className="border-t pt-4 text-right text-gray-600">
        <p className="font-medium">{prescription.doctor?.name || "Doctor"}</p>
        <p className="text-sm">{prescription.doctor?.reg || ""}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between print:hidden">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-50"
        >
          <FiArrowLeft /> Back
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded"
          style={{ backgroundColor: "#af3233" }}
        >
          <FiPrinter /> Print
        </button>
      </div>
    </div>
  );
}
