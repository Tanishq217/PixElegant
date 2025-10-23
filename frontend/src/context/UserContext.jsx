import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { authDataContext } from "./authContext.jsx";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);

  const { serverURL } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverURL}/api/user/getcurrentuser`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("Fetched current user data", result.data);
    } catch (error) {
      setUserData(null);
      console.log("Error in fetching current user data", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <userDataContext.Provider value={{ userData, setUserData, getCurrentUser }}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
