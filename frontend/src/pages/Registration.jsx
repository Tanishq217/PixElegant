import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext.jsx";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase.js";
import { userDataContext } from "../context/userContext.jsx";

function Registration() {
  const { serverURL } = useContext(authDataContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { getCurrentUser } = useContext(userDataContext);

  // Regular signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        `${serverURL}/api/user/register`,
        { name, email, password },
        { withCredentials: true }
      );

      // Fetch current user and redirect to home
      await getCurrentUser();
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error("Signup error:", err.response || err.message);
    }
  };

  // Google signup / login
  const GoogleSignup = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError("");

    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      await axios.post(
        `${serverURL}/api/auth/googleLogin`,
        { name: user.displayName, email: user.email },
        { withCredentials: true }
      );

      // Fetch current user and redirect to home
      await getCurrentUser();
      navigate("/home"); // ✅ redirect to home
    } catch (err) {
      setError(err.message || "Google sign in failed");
      console.error("Google signup error:", err);
    }
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Background Waves */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e0e0e0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#cfcfcf" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,320 C360,400 1080,240 1440,320 L1440,800 L0,800 Z"
          >
            <animate
              attributeName="d"
              dur="25s"
              repeatCount="indefinite"
              values="
                M0,320 C360,400 1080,240 1440,320 L1440,800 L0,800 Z;
                M0,300 C360,360 1080,280 1440,300 L1440,800 L0,800 Z;
                M0,320 C360,400 1080,240 1440,320 L1440,800 L0,800 Z
              "
            />
          </path>
          <path
            fill="url(#waveGradient)"
            d="M0,400 C360,480 1080,320 1440,400 L1440,800 L0,800 Z"
          >
            <animate
              attributeName="d"
              dur="30s"
              repeatCount="indefinite"
              values="
                M0,400 C360,480 1080,320 1440,400 L1440,800 L0,800 Z;
                M0,420 C360,500 1080,300 1440,420 L1440,800 L0,800 Z;
                M0,400 C360,480 1080,320 1440,400 L1440,800 L0,800 Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Registration Box */}
      <div className="relative z-10 bg-white/90 backdrop-blur-lg shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-black/10 rounded-3xl p-10 w-full max-w-md text-gray-900">
        <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Create Your PixElegant Account
        </h1>

        {/* Google button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={GoogleSignup}
            className="w-full flex items-center justify-center gap-3 bg-black text-white font-semibold py-3 rounded-lg shadow-lg hover:brightness-90 transition-all"
          >
            Log in with Google
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:brightness-90 shadow-lg"
          >
            Create Account
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="mt-2 text-red-600">{error}</p>}
        <div className="flex justify-center mt-4">
          <Link
            to="/login"
            className="text-black font-semibold hover:underline"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
