// simple in-memory mock
const store = {}; // key: dateStr -> { slots: [...] }

const scheduleService = {
  getSchedule: (doctorId) => {
    // return Promise of store snapshot
    return new Promise((res) => {
      setTimeout(() => res({ ...store }), 200);
    });
  },

  updateSlots: (doctorId, dateStr, slots) => {
    return new Promise((res) => {
      setTimeout(() => {
        store[dateStr] = { slots };
        res({ ok: true });
      }, 150);
    });
  },
};

export default scheduleService;
