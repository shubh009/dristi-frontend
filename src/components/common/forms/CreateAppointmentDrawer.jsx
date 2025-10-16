import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiCloseCircleLine, RiClosedCaptioningLine } from "react-icons/ri";
import { PiPlusCircleLight } from "react-icons/pi";

export default function CreateAppointmentDrawer({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    location: "",
    problem: "",
    date: "",
    time: "",
    type: "",
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Close drawer with ESC key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.problem.trim())
      newErrors.problem = "Please describe the issue";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time";
    if (!formData.type) newErrors.type = "Select appointment type";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields correctly", {
        position: "bottom-center",
      });
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Appointment created successfully!", {
        position: "bottom-center",
      });

      if (onSave) onSave(formData);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        location: "",
        problem: "",
        date: "",
        time: "",
        type: "",
      });

      onClose();
    }, 1200);
  };

  return (
    <>
      <ToastContainer />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-3 border-b flex items-center justify-between bg-gradient-to-r from-[#fde1cc] to-[#edddab]">
              <h2 className="text-xl font-bold text-black">New Appointment</h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-primary text-xl font-bold rounded-md h-[30px] w-[30p] py-0.5"
              >
                <RiCloseCircleLine />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-6 space-y-5"
            >
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Patient Info
                </h3>
                <div className="space-y-6">
                  {["name", "email", "phone", "city", "location"].map(
                    (field) => (
                      <div key={field}>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          placeholder={
                            field.charAt(0).toUpperCase() + field.slice(1)
                          }
                          value={formData[field]}
                          onChange={handleChange}
                          className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
                            errors[field]
                              ? "border-red-500"
                              : "border-gray-300 focus:border-primary"
                          }`}
                        />
                        {errors[field] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[field]}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Appointment Info
                </h3>

                {/* Appointment Type */}
                <div>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
                      errors.type
                        ? "border-red-500"
                        : "border-gray-300 focus:border-primary"
                    }`}
                  >
                    <option value="">Select Appointment Type</option>
                    <option value="First Visit">First Visit</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                  {errors.type && (
                    <p className="text-xs text-red-500 mt-1">{errors.type}</p>
                  )}
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
                        errors.date
                          ? "border-red-500"
                          : "border-gray-300 focus:border-primary"
                      }`}
                    />
                    {errors.date && (
                      <p className="text-xs text-red-500 mt-1">{errors.date}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none ${
                        errors.time
                          ? "border-red-500"
                          : "border-gray-300 focus:border-primary"
                      }`}
                    />
                    {errors.time && (
                      <p className="text-xs text-red-500 mt-1">{errors.time}</p>
                    )}
                  </div>
                </div>

                {/* Problem */}
                <div className="mt-6">
                  <textarea
                    name="problem"
                    placeholder="Describe the problem..."
                    value={formData.problem}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none resize-none ${
                      errors.problem
                        ? "border-red-500"
                        : "border-gray-300 focus:border-primary"
                    }`}
                  />
                  {errors.problem && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.problem}
                    </p>
                  )}
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="p-4 border-t flex justify-end gap-3 bg-gray-50">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition flex items-center gap-1"
              >
                <RiCloseCircleLine />
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className={`px-5 py-2 rounded-full font-semibold transition flex items-center gap-1 ${
                  isSaving
                    ? "bg-primary-light/60 cursor-not-allowed"
                    : "bg-orange-200 text-black hover:brightness-95 shadow-md"
                }`}
              >
                <PiPlusCircleLight className="font-semibold" />
                {isSaving ? "Saving..." : "Save Appointment"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
