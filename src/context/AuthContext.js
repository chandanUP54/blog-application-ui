
import React, { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { BASE_API_URL } from "../auth/url";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const jwt = localStorage.getItem("accessJwt");
  const refreshToken = localStorage.getItem("refreshJwt");

  useEffect(() => {
    if (jwt) {
      fetch(`${BASE_API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setCurrentUserId(data.id);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setCurrentUserId(null); // Optionally handle errors by resetting currentUser
          handleLogout()
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
    sessionStorage.clear();
  };

  const refetchLoginDetails = useCallback(async () => {
  
    try {
      const response = await fetch(`${BASE_API_URL}/refresh_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (!response.ok) throw new Error("Refresh failed");

      const data = await response.json();

      localStorage.setItem("role", data.role);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("accessJwt", data.accessToken);
      localStorage.setItem("refreshJwt", data.refreshToken);
      setCurrentUserId(data.id);
    } catch (error) {
      handleLogout();
    }
  }, [refreshToken, handleLogout]);

  //run on every first page load
  useEffect(() => {
    if (!sessionStorage.getItem("initialRefreshDone")) {
      if (jwt && refreshToken) {
        sessionStorage.setItem("initialRefreshDone", "true");
        refetchLoginDetails();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ handleLogout, isTokenExpired, currentUserId, setCurrentUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
