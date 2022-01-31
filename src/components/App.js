import React, { useState, useEffect } from "react";
import { callApi } from "../api";
import {
  Nav,
  Login,
  AccountForm,
  Routines,
  Activity,
  NewRoutineForm,
} from "./";

import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import MyRoutines from "./MyRoutines";

const App = () => {
  const [token, setToken] = useState("");
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [userData, setUserData] = useState({});
  const fetchUserData = async (token) => {
    const data = await callApi({
      url: "/users/me",
      token,
    });
    return data;
  };

  useEffect(async () => {
    // const posts = await fetchPosts();
    // setPosts(posts);
    if (!token) {
      setToken(localStorage.getItem("token"));
      return;
    }
    const data = await fetchUserData(token);
    console.log("DATA: ", data);
    if (data && data.username) {
      setUserData(data);
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      const allRoutines = await callApi({ url: "/routines" });
      setRoutines(allRoutines);
      const allActivities = await callApi({ url: "/activities" });
      setActivities(allActivities);
      console.log(allActivities);
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
        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route path="/login">
            <AccountForm action="login" setToken={setToken} />
          </Route>
          <Route path="/register">
            <AccountForm action="register" setToken={setToken} />
          </Route>
          <Route exact path="/routines/:routineId/edit">
            <NewRoutineForm
              token={token}
              routines={routines}
              setRoutines={setRoutines}
              action="edit"
            />
          </Route>
          <Route path="/routines">
            <Routines routines={routines}></Routines>
          </Route>
          <Route path="/activities">
            <h1>Activities</h1>
            <Activity activities={activities}></Activity>
          </Route>

          <Route path="/myroutines">
            <MyRoutines token={token} userName={userData.username} />
          </Route>
          {/* <Route path="/login">
          <Login></Login>
        </Route> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
