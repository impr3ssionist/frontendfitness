import React, { useState } from "react";
import NewRoutineForm from "./routineToCreate";

const MyRoutines = ({ token }) => {
  const [routines, setRoutines] = useState([]);
  return (
    <div>
      <NewRoutineForm
        action="new"
        token={token}
        routines={routines}
        setRoutines={setRoutines}
      />
    </div>
  );
};

export default MyRoutines;
