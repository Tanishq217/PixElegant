import React, { createContext, useState } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {
  // Use environment variable for production, fallback to localhost for development
  const [serverURL] = useState(
    import.meta.env.VITE_SERVER_URL || "http://localhost:4000"
  );

  return (
    <authDataContext.Provider value={{ serverURL }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
