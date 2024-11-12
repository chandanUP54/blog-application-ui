import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { BASE_API_URL } from "../auth/url";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const jwt = localStorage.getItem("accessJwt");



  useEffect(() => {
    if (jwt) {
      fetch(`${BASE_API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          setCurrentUserId(data.id);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          setCurrentUserId(null); // Optionally handle errors by resetting currentUser
        });
    }
  }, [jwt]); // Only run this effect when jwt changes



  const isTokenExpired = (token) => {
    if (!token) return true;
    const { exp } = jwtDecode(token);
    return exp * 1000 < Date.now();
  };

  const handleLogout = () => {
    window.location.reload();
    localStorage.clear("isAuthenticated");
    localStorage.clear("role");
    localStorage.clear("accessJwt");
  };

  return (
    <AuthContext.Provider
      value={{ handleLogout, isTokenExpired, currentUserId, setCurrentUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
