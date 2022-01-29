import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = ({ token }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  return (
    <div id="nav-bar">
      <div id="nav-links">
        <span>
          <Link to="/">Home</Link>
        </span>
        <div>
          {isLoggedIn ? (
            <div>
              <span>
                <Link to="/logout">Logout</Link>
              </span>
              <span>
                <Link to="/myroutines">My routines</Link>
              </span>
            </div>
          ) : (
            <div>
              <div>
                <span>
                  <Link to="/login">Login</Link>
                </span>
                <span>
                  <Link to="/register">Register</Link>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
