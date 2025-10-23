/*
 *****************************************************************
 ***********************************************************
 * Controlled-ish table component with:
 * - search by key(s)
 * - pagination
 * - responsive: table on large screens, card list on small screens
 *
 * Props:
 * - columns: [{ key, label, render?: (row) => jsx, sortable?: boolean }]
 * - data: array
 * - pageSizeOptions: [10,25,50]
 * - initialPageSize
 * - onRowAction(row, action)
 * - searchKeys: ['patientName','phone']
 **********************************************************
 ******************************************************************
 */

import { useState, useMemo } from "react";
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";

export default function ResponsiveDataTable({
  title = "Data Table",
  columns = [],
  data = [],
  searchableKeys = [],
  sortableKeys = [],
  pageSize = 10,
  loading = false,
  emptyText = "No records found.",
  showSearch = true,
  onEdit,
  onDelete,
  onView,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // ----- Sorting Handler -----
  const handleSort = (key) => {
    if (!sortableKeys.includes(key)) return; // skip if column is not sortable

    setSortConfig((prev) => {
      if (prev.key === key && prev.direction === "asc") {
        return { key, direction: "desc" };
      } else if (prev.key === key && prev.direction === "desc") {
        return { key: null, direction: "asc" }; // reset sorting
      } else {
        return { key, direction: "asc" };
      }
    });
  };

  // ----- Search Filtering -----
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    return data.filter((row) =>
      searchableKeys.some((key) =>
        String(row[key] || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, searchableKeys]);

  // ----- Sorting -----
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key] ?? "";
      const bVal = b[sortConfig.key] ?? "";

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortConfig.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // ----- Pagination -----
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // ----- Reset page when search changes -----
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none w-full sm:w-64"
          />
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-10 text-center text-gray-500">Loading...</div>
      )}

      {/* Empty State */}
      {!loading && paginatedData.length === 0 && (
        <div className="py-10 text-center text-gray-500">{emptyText}</div>
      )}

      {/* Desktop Table View */}
      {!loading && paginatedData.length > 0 && (
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-200 ">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col) => {
                  const isSortable = sortableKeys.includes(col.key);
                  const isSorted = sortConfig.key === col.key;

                  return (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className={`px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r ${
                        isSortable ? "cursor-pointer select-none" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        {isSortable && (
                          <>
                            {isSorted && sortConfig.direction === "asc" && (
                              <FiChevronUp className="text-gray-500" />
                            )}
                            {isSorted && sortConfig.direction === "desc" && (
                              <FiChevronDown className="text-gray-500" />
                            )}
                            {!isSorted && (
                              <span className="text-gray-400 text-xs">↕</span>
                            )}
                          </>
                        )}
                      </div>
                    </th>
                  );
                })}
                {(onEdit || onDelete || onView) && (
                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition-colors "
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-2 text-sm text-gray-700 border-r"
                    >
                      {row[col.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete || onView) && (
                    <td className="px-4 py-2 text-right text-sm">
                      <div className="flex justify-end gap-2">
                        {onView && (
                          <button
                            onClick={() => onView(row)}
                            className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                            title="View"
                          >
                            <FiEye />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-2 text-yellow-500 hover:bg-yellow-100 rounded"
                            title="Edit"
                          >
                            <FiEdit />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="p-2 text-red-500 hover:bg-red-100 rounded"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      {!loading && paginatedData.length > 0 && (
        <div className="block md:hidden space-y-4">
          {paginatedData.map((row, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              {columns.map((col) => (
                <div key={col.key} className="mb-2">
                  <span className="text-sm font-semibold text-gray-500">
                    {col.label}:
                  </span>
                  <p className="text-sm text-gray-800">{row[col.key]}</p>
                </div>
              ))}

              {(onEdit || onDelete || onView) && (
                <div className="flex justify-end gap-3 mt-3">
                  {onView && (
                    <button
                      onClick={() => onView(row)}
                      className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                      title="View"
                    >
                      <FiEye />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="p-2 text-yellow-500 hover:bg-yellow-100 rounded"
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && paginatedData.length > 0 && (
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <span>
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
