import React from "react";

const categories = ["Eye", "Blood", "Imaging", "General"];

export default function TestRow({ idx, row, onChange, onRemove }) {
  return (
    <div className="border rounded p-3 mb-3 bg-white grid grid-cols-1 md:grid-cols-3 gap-2">
      <input
        placeholder="Test name"
        value={row.name}
        onChange={(e) => onChange(idx, { ...row, name: e.target.value })}
        className="border rounded px-3 py-2"
      />
      <select
        value={row.category}
        onChange={(e) => onChange(idx, { ...row, category: e.target.value })}
        className="border rounded px-3 py-2"
      >
        <option value="">Category</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <div className="flex gap-2">
        <input
          placeholder="Notes"
          value={row.notes}
          onChange={(e) => onChange(idx, { ...row, notes: e.target.value })}
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          onClick={() => onRemove(idx)}
          className="border rounded px-3 py-2 text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
