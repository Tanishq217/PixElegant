// src/context/authContext.jsx
import React, { createContext, useState } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {
  // Use production URL for deployed backend
  const [serverURL] = useState(
    import.meta.env.VITE_SERVER_URL || "https://pixelegant-clothing-app.onrender.com"
  );

  return (
    <authDataContext.Provider value={{ serverURL }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
