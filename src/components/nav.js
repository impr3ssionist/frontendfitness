import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const Nav = ({ token, setToken }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
    history.pushState("/");
  };

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
                <Link onClick={Logout} to="/logout">
                  Logout
                </Link>
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
          <span>
            <Link to="/routines">Routines</Link>
          </span>
          <span>
            <Link to="/activities">Activities</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
