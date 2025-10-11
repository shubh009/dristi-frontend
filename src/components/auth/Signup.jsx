import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { fullName, email, mobile, password, confirmPassword } = formData;

    if (!fullName.trim()) {
      toast.error("Full Name is required.", { position: "bottom-center" });
      return false;
    }

    if (!mobile.trim()) {
      toast.error("Mobile number is required.", { position: "bottom-center" });
      return false;
    }
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Mobile number must be 10 digits.", {
        position: "bottom-center",
      });
      return false;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "bottom-center",
      });
      return false;
    }

    if (!password) {
      toast.error("Password is required.", { position: "bottom-center" });
      return false;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      toast.error("Password must be alphanumeric (min 6 characters).", {
        position: "bottom-center",
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", { position: "bottom-center" });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    toast.loading("Creating your account...", {
      position: "bottom-center",
      id: "signup",
    });

    setTimeout(() => {
      toast.dismiss("signup");
      setLoading(false);
      setShowSuccess(true);
      toast.success("Signup successful!", { position: "bottom-center" });

      setTimeout(() => {
        setShowSuccess(false);
        navigate("/login");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 to-white px-4 py-10">
      <Toaster />

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden ">
        {/* Left side image */}
        <div className="md:w-1/2 bg-[url('https://drishti-eye-care.vercel.app/Images/eye-checkup.jpeg')] bg-cover bg-center rounded-l-2xl shadow-2xl relative flex flex-col justify-center text-white">
          <div className="absolute inset-0 bg-teal-900/60 rounded-l-2xl" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-4xl font-bold mb-3">Dristi Eye Care</h2>
            <p className="text-lg text-teal-100 max-w-md mx-auto">
              Empowering better vision with care and technology.
            </p>
          </div>
        </div>

        {/* Right side form */}
        <div className="md:w-1/2 flex justify-center items-center p-10 bg-white rounded-r-2xl shadow-2xl relative">
          {/* Loading Spinner */}
          {loading && (
            <div className="absolute inset-0 bg-white/80 flex flex-col justify-center items-center z-20">
              <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-teal-700 font-semibold">Please wait...</p>
            </div>
          )}

          {/* Success Animation */}
          {showSuccess && (
            <div className="absolute inset-0 bg-white flex flex-col justify-center items-center z-20 animate-fadeIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-green-500 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-green-600 text-lg mt-2 font-semibold">
                Signup Successful!
              </p>
            </div>
          )}

          {/* Signup Form */}
          <div className="w-full max-w-xl">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-700 to-teal-500 text-primary bg-clip-text mb-6 text-center">
              Create Your Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300 hover:shadow-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300 hover:shadow-sm"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Enter your 10-digit number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300 hover:shadow-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300 hover:shadow-sm"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300 hover:shadow-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary text-black font-semibold py-3 rounded-full hover:bg-yellow-400 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 text-2xl"
              >
                Sign Up Here !!!
              </button>

              <p className="text-md text-center text-gray-7800 mt-4">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
