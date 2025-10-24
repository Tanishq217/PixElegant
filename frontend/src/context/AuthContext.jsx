// src/context/authContext.jsx
import React, { createContext, useState } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {
  // Make sure this matches the backend port (here 4000)
  const [serverURL] = useState("http://localhost:4000");

  return (
    <authDataContext.Provider value={{ serverURL }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
