import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Nav from "./components/Nav.jsx";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { userDataContext } from './context/userContext.jsx';

function App() {
  const { userData } = useContext(userDataContext);
  const location = useLocation();

  // Only hide Nav on login/signup pages
  const hideNav = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNav && <Nav />} {/* Nav always rendered except on login/signup */}

      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={!userData ? <Registration /> : <Navigate to="/home" replace />} />
        <Route path="/login" element={!userData ? <Login /> : <Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
