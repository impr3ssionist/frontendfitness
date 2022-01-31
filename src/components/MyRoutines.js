import React, { useEffect, useState } from "react";
import { reactRouterDom, Link } from "react-router-dom";
import { callApi } from "../api";
import NewRoutineForm from "./routineToCreate";

const MyRoutines = ({ token, userName }) => {
  const [routines, setRoutines] = useState([]);
  useEffect(async () => {
    if (userName) {
      const myroutines = await callApi({
        url: `/users/${userName}/routines`,
        method: "GET",
        token: token,
      });
      setRoutines(myroutines);
    }
  }, [userName]);
  return (
    <div>
      <NewRoutineForm
        action="new"
        token={token}
        routines={routines}
        setRoutines={setRoutines}
      />
      {routines.map(({ id, name, goal, creatorName, activities }) => (
        <div
          className="routine-info"
          key={id}
          style={{ border: "2px solid black" }}
        >
          <h3>Name:{name}</h3> <h4>Goal:{goal}</h4>{" "}
          <h5>Created by: {creatorName}</h5>
          {activities
            ? activities.map(({ id, name, count, duration, description }) => (
                <div>
                  <h6>Activity: {name}</h6>
                  <p>Description:{description}</p>
                  <p>Count:{count}</p>
                  <p>Duration:{duration}</p>
                </div>
              ))
            : null}
          <Link to={`/routines/${id}/edit`} style={{ color: "blue" }}>
            Edit This Post
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyRoutines;
