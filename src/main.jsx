import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App className="flex flex-col min-h-screen w-full bg-gray-50 text-gray-800" />
    </AuthProvider>
  </React.StrictMode>
);
