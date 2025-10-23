// src/services/prescriptionService.js
import axios from "axios";

const BASE_URL = "/api/prescriptions"; // Adjust this based on your backend route

// Create an Axios instance for consistency across services
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic handler to extract valid array data
const extractArray = (res) => {
  if (!res || !res.data) return [];
  // Some APIs return { data: [...] }, others return direct arrays
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.data)) return res.data.data;
  return []; // fallback
};

// Generic handler to extract single object
const extractObject = (res) => {
  if (!res || !res.data) return null;
  return res.data.data || res.data || null;
};

// Common error handler
const handleError = (error, action) => {
  console.error(`PrescriptionService (${action}) error:`, error);
  throw (
    error.response?.data?.message ||
    error.message ||
    "Something went wrong. Please try again."
  );
};

// =============================
//  CRUD OPERATIONS
// =============================

// 1️⃣ Get all prescriptions
export const getPrescriptions = async () => {
  try {
    const res = await api.get("/");
    return extractArray(res);
  } catch (error) {
    handleError(error, "getPrescriptions");
    return [];
  }
};

// 2️⃣ Get prescription by ID
export const getPrescriptionById = async (id) => {
  try {
    const res = await api.get(`/${id}`);
    return extractObject(res);
  } catch (error) {
    handleError(error, "getPrescriptionById");
    return null;
  }
};

// 3️⃣ Create new prescription
export const createPrescription = async (data) => {
  try {
    const res = await api.post("/", data);
    return extractObject(res);
  } catch (error) {
    handleError(error, "createPrescription");
    return null;
  }
};

// 4️⃣ Update prescription
export const updatePrescription = async (id, data) => {
  try {
    const res = await api.put(`/${id}`, data);
    return extractObject(res);
  } catch (error) {
    handleError(error, "updatePrescription");
    return null;
  }
};

// 5️⃣ Delete prescription
export const deletePrescription = async (id) => {
  try {
    await api.delete(`/${id}`);
    return true;
  } catch (error) {
    handleError(error, "deletePrescription");
    return false;
  }
};
