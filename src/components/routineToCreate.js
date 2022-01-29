import React, { useState } from "react";
import { callApi } from "../api";
import { useHistory, useParams } from "react-router-dom";

const NewRoutineForm = ({ token, setRoutines, routines, action }) => {
  const history = useHistory();
  const { RoutineId } = useParams();

  const [newRoutine, setNewRoutine] = useState({
    name: "",
    goal: "",
    isPublic: false,
  });
  const isEdit = action === "edit";
  const title = isEdit ? "Edit This Routine" : "Add a New Routine";
  const method = isEdit ? "PATCH" : "POST";
  const API_URL = isEdit ? `/routines/${RoutineId}` : `/routines`;

  const handleSubmit = async () => {
    event.preventDefault();
    try {
      const routine = await callApi({
        url: API_URL,
        method: method,
        body: newRoutine,
        token,
      });

      if (isEdit) {
        //grab existing Routines other than the one I'm editing
        // add in the Routine i've edited
        const filteredRoutines = routines.filter(
          (Routine) => Routine._id !== RoutineId
        );
        setRoutines([...filteredRoutines, routine]);
        history.push("/myroutines");
      } else {
        //otherwise i am creating a new Routine, so take my old Routines and add this new one to the bottom
        setRoutines([...routines, routine]);
      }
      //no matter what send users to the /Routines page when we are done
    } catch (error) {
      console.error("Error adding your Routine:", error);
    }
  };

  const handleRoutineFieldChange = (property) => (event) => {
    if (property === "isPublic") {
      setNewRoutine({ ...newRoutine, [property]: event.target.checked });
    } else {
      setNewRoutine({ ...newRoutine, [property]: event.target.value });
    }
  };

  return (
    <>
      <h2>{title}</h2>
      <form id="new-Routine-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What is your routine name?"
          onChange={handleRoutineFieldChange("name")}
          value={newRoutine.name}
        ></input>
        <input
          type="text"
          placeholder="What is the goal?"
          onChange={handleRoutineFieldChange("goal")}
          value={newRoutine.goal}
        ></input>

        <label>
          Let everybody see this routine?
          <input
            type="checkbox"
            onChange={handleRoutineFieldChange("isPublic")}
            value={newRoutine.isPublic}
          ></input>
        </label>

        <button>{title}</button>
      </form>
    </>
  );
};

export default NewRoutineForm;
