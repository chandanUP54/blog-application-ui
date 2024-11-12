import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  // const { isAuthenticated, handleLogout } = useAuth();

  // console.log("is auth",isAuthenticated);
  

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link to="/" className="text-white hover:text-gray-300">
            BlogX
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/view/articles"
              className="text-white hover:text-gray-300"
            >
              Articles
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              {/* Admin Links */}
              {role === "ROLE_ADMIN" && (
                <>
                  <li>
                    <Link
                      to="/allblogs"
                      className="text-white hover:text-gray-300"
                    >
                      Datatable
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="text-white hover:text-gray-300"
                    >
                      Profile
                    </Link>
                  </li>
                </>
              )}

              {/* User Links */}
              {role === "ROLE_USER" && (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="text-white hover:text-gray-300"
                    >
                      Profile
                    </Link>
                  </li>
                </>
              )}
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">
                  login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
