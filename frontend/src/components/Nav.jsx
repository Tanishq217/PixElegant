import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import assets from "../assets/assets.js";
import { userDataContext } from "../context/userContext.jsx";
import axios from "axios";
import { authDataContext } from "../context/authContext.jsx";

const Nav = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userData, setUserData } = useContext(userDataContext);
  const { serverURL } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full bg-white text-black shadow-md px-6 py-3 flex items-center justify-between relative">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} className="h-12 w-auto" alt="PixElegant Logo" />
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 font-semibold">
        <Link to="/home" className="hover:text-gray-500 transition">
          Home
        </Link>
        <Link to="/collections" className="hover:text-gray-500 transition">
          Collections
        </Link>
        <Link to="/about" className="hover:text-gray-500 transition">
          About
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <button className="hover:text-gray-500 transition">
          <img src={assets.search} className="h-6 w-6" alt="search" />
        </button>

        {/* Cart */}
        <button className="hover:text-gray-500 transition">
          <img src={assets.cart} className="h-6 w-6" alt="cart" />
        </button>

        {/* Desktop Account */}
        <div className="hidden md:block relative">
          {userData ? (
            <>
              <div
                className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center cursor-pointer font-semibold"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              >
                {userData.name.charAt(0).toUpperCase()}
              </div>
              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg py-2 z-50">
                  <Link
                    to="/account"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Account
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-black text-white rounded hover:brightness-90 transition"
            >
              Log In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden relative">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mt-2.5" // adds small margin from top
          >
            <img src={assets.menu} className="h-7 w-6" alt="menu" />
          </button>

          {mobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-lg py-2 z-50">
              {/* Mobile Links */}
              <Link
                to="/home"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/collections"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              <hr className="my-2 border-gray-300" />

              {/* Mobile Account / Login */}
              {userData ? (
                <>
                  <Link
                    to="/account"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Account
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-2 bg-black text-white rounded hover:brightness-90 mx-2 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
