import { createContext, useEffect, useState } from "react";
import newRequest from "../utils/newRequest";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  newRequest.defaults.withCredentials = true;

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await newRequest.post(`/auth/login`, inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await newRequest.post(`/auth/logout`);
    setCurrentUser(null);
  };

  const deletePostImage = async (filename) => {
    try {
      await newRequest.delete(`/pictures/${filename}`);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, deletePostImage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
