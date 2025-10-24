import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { authDataContext } from "./authContext.jsx";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);

  const { serverURL } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverURL}/api/user/getadmin`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("Fetched current admin data", result.data);
    } catch (error) {
      setUserData(null);
      // Don't log error if it's just a 401 (not logged in) - this is normal
      if (error.response?.status !== 401) {
        console.log("Error in fetching current admin data", error);
      }
    }
  };

  // Only try to get current user if we have a token
  useEffect(() => {
    // Check if there's a token in cookies first
    const hasToken = document.cookie.includes('token=');
    if (hasToken) {
      getCurrentUser();
    }
  }, []);

  return (
    <userDataContext.Provider value={{ userData, setUserData, getCurrentUser }}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;