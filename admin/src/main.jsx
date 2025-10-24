import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContext from "./context/authContext.jsx";
import UserContext from "./context/userContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <UserContext>
          <App />
        </UserContext>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);
