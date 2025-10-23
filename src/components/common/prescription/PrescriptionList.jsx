import React, { useEffect, useState, useMemo } from "react";
import ResponsiveDataTable from "../../common/ui-components/tables/ResponsiveDataTable";
import { FiEye, FiEdit, FiTrash2, FiPrinter } from "react-icons/fi";
import {
  getPrescriptions,
  deletePrescription,
} from "../../../services/prescriptionService/";
import { format } from "date-fns";

export default function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // === Fetch Data ===
  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const data = await getPrescriptions(); // from prescriptionService.js
      setPrescriptions(data || []);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  // === Delete Handler ===
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this prescription?")) return;
    try {
      await deletePrescription(id);
      setPrescriptions((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // === Columns Definition ===
  const columns = useMemo(
    () => [
      { key: "date", label: "Date", sortable: true },
      { key: "patientName", label: "Patient Name", sortable: true },
      { key: "doctorName", label: "Doctor", sortable: true },
      { key: "testsCount", label: "Tests", sortable: false },
      { key: "medicinesCount", label: "Medicines", sortable: false },
    ],
    []
  );

  // === Data Transformation ===
  const formattedData = prescriptions.map((p) => ({
    id: p.id,
    date: format(new Date(p.date), "dd MMM yyyy"),
    patientName: p.patientName,
    doctorName: p.doctor?.name || "-",
    testsCount: p.tests?.length || 0,
    medicinesCount: p.medicines?.length || 0,
  }));

  // === Action Buttons ===
  const renderActions = (row) => (
    <div className="flex gap-2 text-gray-600">
      <button
        title="View"
        onClick={() => navigate(`/prescriptions/${row.id}/view`)}
        className="hover:text-primary"
      >
        <FiEye />
      </button>
      <button
        title="Edit"
        onClick={() => alert(`Editing prescription ${row.id}`)}
        className="hover:text-blue-500"
      >
        <FiEdit />
      </button>
      <button
        title="Print"
        onClick={() => navigate(`/prescriptions/${row.id}/print`)}
        className="hover:text-green-600"
      >
        <FiPrinter />
      </button>
      <button
        title="Delete"
        onClick={() => handleDelete(row.id)}
        className="hover:text-red-500"
      >
        <FiTrash2 />
      </button>
    </div>
  );

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <h2 className="text-xl font-semibold"></h2>
        <button
          onClick={() => alert("Navigating to create prescription")}
          className="mt-3 sm:mt-0 bg-primary text-white px-4 py-2 rounded"
          style={{ backgroundColor: "#af3233" }}
        >
          + New Prescription
        </button>
      </div>

      <ResponsiveDataTable
        title="All Prescriptions List"
        columns={[...columns, { key: "actions", label: "Actions" }]}
        data={formattedData.map((row) => ({
          ...row,
          actions: renderActions(row),
        }))}
        searchableKeys={["patientName", "doctorName"]}
        sortableKeys={["date", "patientName", "doctorName"]}
        pageSize={10}
        loading={loading}
        emptyText="No prescriptions found."
      />
    </div>
  );
}
