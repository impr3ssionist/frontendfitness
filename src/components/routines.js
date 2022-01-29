import React, { useState } from "react";
import { callApi } from "../api";

// const method = "DELETE";

const routineMatches = (routine, searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  const { goal, name, creatorName } = routine;

  const toMatch = [goal, name, creatorName];

  for (let i = 0; i < toMatch.length; i++) {
    const field = toMatch[i];
    if (field.toLowerCase().includes(searchTermLower)) {
      return true;
    }
  }
};

const Routines = ({ routines, activities }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const routinesToDisplay = routines.filter((routine) =>
    routineMatches(routine, searchTerm)
  );

  const handleSubmit = async (routineId) => {
    const API_URL = `/routines/${routineId}`;
    event.preventDefault();
    try {
      await callApi({
        url: API_URL,
        method: method,
        token: token,
      });
      const remainingroutines = routines.filter(
        (routine) => routine.id !== routineId
      );
      setroutines(remainingroutines);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="routines-nav">
        <h2 className="page-title">routines</h2>
        <input
          type="text"
          placeholder="Search routines"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>
      </div>
      {routinesToDisplay.length ? (
        routinesToDisplay.map(({ id, name, goal, creatorName, activities }) => (
          <div
            className="routine-info"
            key={id}
            style={{ border: "2px solid black" }}
          >
            <h3>Name:{name}</h3> <h4>Goal:{goal}</h4>{" "}
            <h5>Created by: {creatorName}</h5>
            {activities.map(({ id, name, count, duration, description }) => (
              <div>
                <h6>Activity: {name}</h6>
                <p>Description:{description}</p>
                <p>Count:{count}</p>
                <p>Duration:{duration}</p>
              </div>
            ))}
          </div>
          //   {/* {routines.creatorName === userData.username ? (
          //   <button onClick={() => handleSubmit(routine.id)}>
          //     Delete routine
          //   </button>
          //   ) : null)} */}
          // // </div>
        ))
      ) : (
        <div>
          <h1>There are no matching routines...</h1>
        </div>
      )}
    </>
  );
};

export default Routines;

// not passing api data into routines function
//
