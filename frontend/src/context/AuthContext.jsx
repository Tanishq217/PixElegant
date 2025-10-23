import React, { createContext } from "react";

// Changed name to match your usage in other files
export const authDataContext = createContext();

export function AuthProvider({ children }) {
  const serverURL = "http://localhost:8000";

  const value = { serverURL };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}
