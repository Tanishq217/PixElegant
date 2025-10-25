import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext.jsx"; // Ensure correct import path
import { userDataContext } from "../context/userContext.jsx"; // Ensure correct import path
import axios from "axios";
import Loading from '../component/Loading'; // Assuming you have a Loading component

function Login() {
  const { serverURL } = useContext(authDataContext); // Get the backend URL from context
  const { getCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // --- **THIS IS THE FIX** ---
    // Construct the correct API endpoint URL
    const apiEndpoint = `${serverURL}/api/auth/adminlogin`;
    // --------------------------

    try {
      console.log("Attempting admin login with:", { email, password });
      console.log("Using API endpoint:", apiEndpoint); // Log the constructed URL

      const result = await axios.post(
        apiEndpoint, // Use the correctly constructed URL
        { email, password },
        { withCredentials: true }
      );

      console.log("Admin login successful:", result.data);

      // Fetch admin data and redirect to home
      console.log("Calling getCurrentUser (admin)..."); // Clarify it's admin user
      await getCurrentUser(); // This should fetch admin details via /api/user/getadmin

      console.log("Navigating to /home...");
      navigate("/home");

    } catch (err) {
      console.error("Admin login error:", err.response?.data || err.message);
      // More specific error message
      if (err.response?.status === 404) {
          setError(`API endpoint not found: ${apiEndpoint}. Check serverURL and backend routes.`);
      } else {
          setError(err.response?.data?.message || err.message || "Admin login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your component (return statement) remains the same
  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-white">
      <div className="relative z-10 bg-white/90 backdrop-blur-lg shadow-lg border rounded-3xl p-10 w-full max-w-md text-gray-900">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>
        <form className="space-y-4" onSubmit={handleAdminLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:brightness-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loading/> : "Sign In"}
          </button>
        </form>
        {error && <p className="mt-3 text-center text-red-600">{error}</p>}
        {/* Removed redundant Links/Forgot Password for admin */}
      </div>
    </div>
  );
}

export default Login;