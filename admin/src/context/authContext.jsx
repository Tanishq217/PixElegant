import React, { createContext, useState } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {
  const [serverURL] = useState("http://localhost:4000"); // Backend runs on port 4000

  return (
    <authDataContext.Provider value={{ serverURL }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
