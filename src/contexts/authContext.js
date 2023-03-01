import axios from "axios";
import { API_URL } from "../apiPath";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(`${API_URL}/auth/login`, inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post(`${API_URL}/auth/logout`);
    setCurrentUser(null);
  };


  const deletePostImage = async (filename) => {
    try {
      await axios.delete(`${API_URL}/pictures/${filename}`);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };


  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, deletePostImage }}>
      {children}
    </AuthContext.Provider>
  );
};
