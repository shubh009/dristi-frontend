import axios from "axios";

const api = axios.create({
  baseURL: "https://api.dristieyecare.com", // update later with backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;