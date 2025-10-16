import { useState, useMemo } from "react";
import { FaListAlt } from "react-icons/fa";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { RiFileList2Line, RiFileListLine } from "react-icons/ri";

export default function ResponsiveDataTable({
  title = "Data Table",
  columns = [],
  data = [],
  searchableKeys = [],
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

  // ----- Pagination -----
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice(
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
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <RiFileList2Line /> {title}
        </h2>

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
            <thead className="bg-primary-gradient text-black">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-2 text-left text-md font-semibold text-black border-r"
                  >
                    {col.label}
                  </th>
                ))}
                {(onEdit || onDelete || onView) && (
                  <th className="px-4 py-2 text-right text-md font-semibold text-gray-600">
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
                      className="px-4 py-2 text-md text-gray-700 border-r"
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
