import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase.js";
import { userDataContext } from "../context/UserContext.jsx";

function Login() {
  const { serverURL } = useContext(authDataContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { getCurrentUser } = useContext(userDataContext);

  // Google login
  const GoogleLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError("");

    try {
      const response = await signInWithPopup(auth, provider);
      console.log("Firebase Google response:", response);

      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      // Send Google user info to backend
      const result = await axios.post(
        `${serverURL}/api/auth/googlelogin`,
        { name, email },
        { withCredentials: true }
      );

      console.log("Google login successful:", result.data);
      setLoggedInUser(result.data);

      // Fetch current user and navigate
      await getCurrentUser();
      navigate("/home");
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.message || "Google login failed");
    }
  };

  // Regular login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Attempting login with:", { email, password, serverURL });
      
      const result = await axios.post(
        `${serverURL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("Login successful:", result.data);

      setLoggedInUser(result.data);
      
      console.log("Calling getCurrentUser...");
      await getCurrentUser();
      
      console.log("Navigating to /home...");
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden flex items-center justify-center bg-white">
      {/* Background Waves */}
      <div className="absolute inset-0">
        <svg className="absolute w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e0e0e0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#cfcfcf" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Waves */}
          <path fill="url(#waveGradient)" d="M0,320 C360,400 1080,240 1440,320 L1440,800 L0,800 Z">
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
          <path fill="url(#waveGradient)" d="M0,400 C360,480 1080,320 1440,400 L1440,800 L0,800 Z">
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

      {/* Login Box */}
      <div className="relative z-10 bg-white/90 backdrop-blur-lg shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-black/10 rounded-3xl p-10 w-full max-w-md text-gray-900">
        <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Log In to PixElegant
        </h1>

        {/* Google Login */}
        <div className="mb-4">
          <button
            type="button"
            onClick={GoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-black text-white font-semibold py-3 rounded-lg shadow-lg hover:brightness-90 transition-all"
          >
            Log in with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <hr className="flex-1 border-gray-300" />
          <span className="text-xs text-gray-400">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:brightness-90 shadow-lg transition-all"
          >
            Log In
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="mt-2 text-red-600">{error}</p>}

        <div className="flex justify-between text-sm mt-4">
          <a href="#" className="text-black/70 hover:underline">Forgot password?</a>
          <Link to="/signup" className="text-black/70 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
