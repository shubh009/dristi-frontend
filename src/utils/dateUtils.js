export function getNextNDays(n = 90) {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < n; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(formatDate(d));
    }
    return arr;
  }
  
  export function formatDate(date) {
    if (typeof date === "string") return date;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  }
  