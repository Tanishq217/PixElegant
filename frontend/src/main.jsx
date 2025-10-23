import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import UserContext from "./context/userContext.jsx"; // ✅ import added

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserContext>
          <App />
        </UserContext>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
