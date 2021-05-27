import React from "react";
import Chart from "./Chart";

function Student(props) {
	return (
		<div>
			<Chart
				graphData={props.data}
				radioState={props.radioState}
				handleFilterChange={props.handleFilterChange}
			/>
		</div>
	);
}

export default Student;
