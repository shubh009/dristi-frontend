// src/pages/PatientProfile.jsx
import React, { useState, useEffect } from "react";
import { RiUserLine, RiCalendarLine, RiTimeLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatentProfile from "../../assets/img/pt-profile.png";

const PatientProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    dob: "1985-10-13",
    gender: "Male",
    contact: "+91 9876543210",
    email: "john@example.com",
    bloodGroup: "O+",
    allergies: "Peanuts, Pollen",
    chronicConditions: "Diabetes",
    medications: "Metformin",
    pastSurgeries: "Appendectomy in 2010",
    street: "123 Main St",
    city: "Agra",
    state: "Uttar Pradesh",
    zip: "282001",
    country: "India",
    preferredContact: "Email",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!profile.fullName.trim()) errs.fullName = "Full name is required";
    if (!profile.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(profile.email)) errs.email = "Invalid email";
    if (!profile.contact.trim()) errs.contact = "Contact number is required";
    else if (!/^\+?\d{10,15}$/.test(profile.contact))
      errs.contact = "Invalid contact number";
    if (!profile.dob.trim()) errs.dob = "Date of birth is required";
    return errs;
  };

  const handleSave = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setSaved(true);
        toast.success("Profile saved successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => setSaved(false), 2000);
      }, 1500); // simulate API call
    } else {
      toast.error("Please fix errors before saving", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen animate-fadeIn">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">Patient Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center max-h-max animate-slideInUp">
          <div className="relative w-36 h-36 mb-4">
            <img
              src={PatentProfile}
              alt="Profile"
              className="rounded-full w-full h-full object-cover border-4 border-blue-400 shadow-lg transition-transform transform hover:scale-105"
            />
          </div>
          <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
            <RiUserLine /> {profile.fullName}
          </h3>
          <p className="text-gray-600 mb-1">{profile.gender}</p>
          <p className="text-gray-600 mb-1">{profile.dob}</p>
          <p className="text-gray-600 mb-1">{profile.contact}</p>
          <p className="text-gray-600 mb-3">{profile.email}</p>

          {/* Quick Stats */}
          <div className="w-full mt-4 grid grid-cols-1 gap-2">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold">
              Total Appointments: 12
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold">
              Upcoming Appointments: 2
            </div>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-semibold">
              Last Visit: 10 Oct 2025
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2 animate-slideInUp">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.dob ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={profile.contact}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Medical Info */}
          <h3 className="text-lg font-semibold mt-6 mb-4">
            Medical Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                value={profile.bloodGroup}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Allergies</label>
              <input
                type="text"
                name="allergies"
                value={profile.allergies}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Chronic Conditions
              </label>
              <input
                type="text"
                name="chronicConditions"
                value={profile.chronicConditions}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Current Medications
              </label>
              <input
                type="text"
                name="medications"
                value={profile.medications}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">
                Past Surgeries / History
              </label>
              <textarea
                name="pastSurgeries"
                value={profile.pastSurgeries}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Address */}
          <h3 className="text-lg font-semibold mt-6 mb-4">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                name="street"
                value={profile.street}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={profile.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Zip / Postal Code
              </label>
              <input
                type="text"
                name="zip"
                value={profile.zip}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={profile.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Account */}
          <h3 className="text-lg font-semibold mt-6 mb-4">Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">
                Preferred Contact
              </label>
              <select
                name="preferredContact"
                value={profile.preferredContact}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>Email</option>
                <option>Phone</option>
                <option>SMS</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleSave}
              className="relative bg-[#af3233eb] text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
            >
              {saving ? (
                <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : saved ? (
                <span className="inline-block text-white animate-bounce">
                  &#10003;
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
