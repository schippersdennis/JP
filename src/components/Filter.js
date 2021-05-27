import React from "react";

function Filter(props) {
  return (
    <div>
      <form onChange={props.handleFilterChange} className="filter">
        <div id="input-container">
          <label>
            <input
              type="radio"
              name="gradeFilter"
              id="both-grades"
              value="both"
              defaultChecked
            />
            Difficulty and Enjoyment
          </label>
          <label>
            <input
              type="radio"
              name="gradeFilter"
              id="difficulty-grade"
              value="difficulty"
            />
            Difficulty
          </label>
          <label>
            <input
              type="radio"
              name="gradeFilter"
              id="enjoyment-grade"
              value="enjoyment"
            />
            Enjoyment
          </label>
        </div>
      </form>
    </div>
  );
}

export default Filter;
