import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Validation (same logic as Signup)
  const validateForm = () => {
    const { email, password } = formData;

    if (!email.trim()) {
      toast.error("Email address is required.", { position: "bottom-center" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "bottom-center",
      });
      return false;
    }

    if (!password.trim()) {
      toast.error("Password is required.", { position: "bottom-center" });
      return false;
    }

    if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/.test(password)) {
      toast.error("Password must be alphanumeric with 6+ characters.", {
        position: "bottom-center",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    toast.loading("Logging in...", { id: "login", position: "bottom-center" });

    // Simulate login request
    setTimeout(() => {
      toast.dismiss("login");
      setLoading(false);
      setShowSuccess(true);
      toast.success("Login successful!", { position: "bottom-center" });

      setTimeout(() => {
        setShowSuccess(false);
        navigate("/patient/dashboard");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 to-white px-4">
      <Toaster />

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden ">
        {/* Left side image */}
        <div className="md:w-1/2 bg-[url('https://optrica.themetechmount.net/wp-content/uploads/2020/12/col-bg-01.jpg')] bg-cover bg-center rounded-l-2xl shadow-2xl relative flex flex-col justify-center text-white">
          <div className="absolute inset-0 bg-teal-900/60 rounded-l-2xl" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-4xl font-bold mb-3">Dristi Eye Care</h2>
            <p className="text-lg text-teal-100 max-w-md mx-auto">
              Providing clear vision with expert care.
            </p>
          </div>
        </div>

        {/* Right side login form */}
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
                Login Successful!
              </p>
            </div>
          )}

          {/* Login Form */}
          <div className="w-full max-w-xl">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-700 to-teal-500 text-primary bg-clip-text mb-6 text-center border-b pb-4">
              Login Panel
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className=" w-full bg-secondary text-black font-semibold py-3 rounded-full text-2xl hover:bg-yellow-400 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login Now !!!"}
              </button>

              <p className="text-md text-center text-gray-800 mt-4">
                <a
                  href="/"
                  className="text-teal-700 font-medium hover:underline"
                >
                  Forgot Password
                </a>
              </p>

              <p className="text-md text-center text-gray-800 ">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-teal-700 font-medium hover:underline"
                >
                  Sign up here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
