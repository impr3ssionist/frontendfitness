import React, { useState, useEffect } from "react";
import { callApi } from "../api";
import { Nav, Login, AccountForm, Routines } from "./";

import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import MyRoutines from "./MyRoutines";

const App = () => {
  const [token, setToken] = useState("");
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allRoutines = await callApi({ url: "/routines" });
      setRoutines(allRoutines);
      setToken(localStorage.getItem("token"));
    };

    fetchData();
  }, [token]);
  return (
    <div>
      <Router>
        <div className="nav-bar">
          <Nav token={token} setToken={setToken}></Nav>
        </div>
        <Route exact path="/">
          <h1>Home</h1>
        </Route>
        <Route path="/login">
          <AccountForm action="login" setToken={setToken} />
        </Route>
        <Route path="/register">
          <AccountForm action="register" setToken={setToken} />
        </Route>
        <Route path="/routines">
          <Routines routines={routines}></Routines>
        </Route>
        <Route path="/user">
          <h1> User</h1>
        </Route>
        <Route path="/myroutines">
          <MyRoutines token={token} />
        </Route>
        <Route path="/activities">
          <h1>Activities</h1>
        </Route>
        {/* <Route path="/login">
          <Login></Login>
        </Route> */}
      </Router>
    </div>
  );
};

export default App;
