import React from "react";
import { getStatusColors } from "../../utils/colorUtils";

export default function StatusBadge({ status }) {
  const { bg, text } = getStatusColors(status);
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}
    >
      {status}
    </span>
  );
}
