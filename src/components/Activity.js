import React, { useState } from "react";
import { callApi } from "../api";

const activityMatches = (activity, searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  const { name, description } = activity;

  const toMatch = [name, description];

  for (const field of toMatch) {
    if (field.toLowerCase().includes(searchTermLower)) {
      return true;
    }
  }
};

const Activity = ({ activities }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const activitiesToDisplay = activities.filter((activity) =>
    activityMatches(activity, searchTerm)
  );

  const handleSubmit = async (activityId) => {
    const API_URL = `/activities/${activityId}`;
    event.preventDefault();
    try {
      await callApi({
        url: API_URL,
        method: method,
        token: token,
      });
      const remainingactivities = activities.filter(
        (activity) => activity.id !== activityId
      );
      setactivities(remainingactivities);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="activities-nav">
        <h2 className="page-title">activities</h2>
        <input
          type="text"
          placeholder="Search activities"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>
      </div>
      {activitiesToDisplay.length ? (
        activitiesToDisplay.map(
          ({
            id,
            name,
            description,
            duration,
            count,
            routineActivityId,
            routineId,
          }) => (
            <div
              className="activity-info"
              key={id}
              style={{ border: "2px solid black" }}
            >
              {/* <h3>Name:{name}</h3> <h4>Description{description}</h4>{" "} */}
              {activities.map(
                ({
                  id,
                  name,
                  description,
                  duration,
                  count,
                  routineActivityId,
                  routineId,
                }) => (
                  <div key={id}>
                    <h6>Activity: {name}</h6>
                    <p>Description:{description}</p>
                    <p>Count:{count}</p>
                    <p>Duration:{duration}</p>
                  </div>
                )
              )}
            </div>
            //   {/* {activities.creatorName === userData.username ? (
            //   <button onClick={() => handleSubmit(activity.id)}>
            //     Delete activity
            //   </button>
            //   ) : null)} */}
            // // </div>
          )
        )
      ) : (
        <div>
          <h1>There are no matching activities...</h1>
        </div>
      )}
    </>
  );
};

export default Activity;

// not passing api data into activities function
//
