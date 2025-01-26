import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LogoNews.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to check cookies for login status and role
  const checkCookies = () => {
    const cookies = document.cookie.split("; ");
    const isLoggedInCookie = cookies.some(cookie =>
      cookie.startsWith("credential=")
    );
    const isAdminCookie = cookies.some(cookie =>
      cookie.startsWith("isAdmin=true")
    );

    setIsLoggedIn(isLoggedInCookie);
    setIsAdmin(isAdminCookie);
  };

  // Handle logout: clear cookies and redirect to Login
  const handleLogout = () => {
    document.cookie = "credential=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/Login"; // Redirect to login after logout
  };

  // Check cookies on component mount
  useEffect(() => {
    checkCookies();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/NewsFeed">
          <img
            src={logo}
            alt="News For You"
            className="navbar-logo"
            style={{ maxHeight: "40px", width: "200px" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/AgencyList">
                Agencies
              </Link>
            </li>
            {/* If not logged in */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/SignUp">
                    Sign Up
                  </Link>
                </li>
              </>
            )}

            {/* If logged in and is admin */}
            {isLoggedIn && isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Admin">
                    Admin Control
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Export">
                    Export
                  </Link>
                </li>
              </>
            )}

            {/* Logout option */}
            {isLoggedIn && (
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
