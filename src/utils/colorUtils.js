
/**
 * colorUtils.js
 * Map status to tailwind-friendly classes for consistency with Dristi theme.
 */

const STATUS_MAP = {
    Pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
    Confirmed: { bg: "bg-[#4babce]/10", text: "text-[#4babce]" },
    Completed: { bg: "bg-green-100", text: "text-green-800" },
    Cancelled: { bg: "bg-red-100", text: "text-red-800" },
    NoShow: { bg: "bg-gray-100", text: "text-gray-700" },
  };
  
  export function getStatusColors(status = "Pending") {
    return STATUS_MAP[status] || { bg: "bg-gray-100", text: "text-gray-700" };
  }
  