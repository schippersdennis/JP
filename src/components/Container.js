import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import studentData from "../data";
import Chart from "./Chart";
import Dashboard from "./Dashboard";
import Student from "./Student";

class Container extends React.Component {
	constructor() {
		super();
		this.state = {
			students: [],
			assignments: [],
			gradings: [],
			graphData: [],
			radioState: { difficulty: true, enjoyment: true },
			filteredBool: false,
		};
	}

	//  removes duplicates from array
	removeDuplicates = (array) => {
		return array.filter((item, index) => array.indexOf(item) === index);
	};

	//  get assignment id by name
	getAssignmentId = (name, assignments) => {
		const assignment = assignments.filter((assignment) => {
			return assignment.name === name;
		});
		return assignment[0].id;
	};

	//  get student id by name
	getStudentId = (name, students) => {
		const student = students.filter((student) => {
			return student.firstName === name;
		});
		return student[0].id;
	};

	//   get students from data and add id
	getStudentState = (data) => {
		const allStudents = data.map((student) => {
			return student.studentName;
		});
		const uniqueStudents = this.removeDuplicates(allStudents);
		const students = uniqueStudents.map((item, index) => {
			return { id: index + 1, firstName: item };
		});
		return students;
	};

	//   get assignments from data and add id
	getAssignmentState = (data) => {
		const allAssignments = data.map((item) => {
			return item.assignment;
		});
		const uniqueAssignments = this.removeDuplicates(allAssignments);
		const assignments = uniqueAssignments.map((item, index) => {
			return { id: index + 1, name: item };
		});
		return assignments;
	};

	//   get grades from data with student and assignment id
	getGradingState = (data, students, assignments) => {
		const gradings = data.map((item, index) => {
			const studentID = this.getStudentId(item.studentName, students);
			const assignmentID = this.getAssignmentId(item.assignment, assignments);
			return {
				id: index + 1,
				studentID: studentID,
				assignmentID: assignmentID,
				difficultyGrade: item.difficulty,
				enjoymentGrade: item.enjoyment,
			};
		});
		return gradings;
	};

	// filter form change
	handleFilterChange = (event) => {
		if (event.target.type === "radio") {
			switch (event.target.value) {
				case "difficulty":
					this.setState({
						radioState: { difficulty: true, enjoyment: false },
						filteredBool: true,
					});
					break;
				case "enjoyment":
					this.setState({
						radioState: { difficulty: false, enjoyment: true },
						filteredBool: true,
					});
					break;
				default:
					this.setState({
						radioState: { difficulty: true, enjoyment: true },
						filteredBool: false,
					});
					break;
			}
		}
	};

	//  get grades from student by id
	getGradesFromStudent = (id) => {
		const state = { ...this.state };
		const studentID = state.students.filter((student) => {
			if (student.firstName === id) return student;
		})[0].id;

		const fromStudent = state.gradings.filter((item) => {
			return item.studentID === studentID;
		});
		const grades = fromStudent.map((item) => {
			const assignmentName = this.getAssignmentName(item.assignmentID);
			return {
				assignmentName: assignmentName,
				difficultyGrade: item.difficultyGrade,
				enjoymentGrade: item.enjoymentGrade,
			};
		});
		return grades;
	};

	//  Get all info from student by id
	getStudentInfo = (id) => {
		const state = [...this.state.students];
		const studentID = id;
		const student = state.filter((student) => {
			return student.firstName === studentID;
		});
		return student;
	};

	//  Function that returns an average from an array of numbers
	getAverage = (score) => {
		return (
			score.reduce((prevValue, currentValue) => currentValue + prevValue) /
			score.length
		);
	};

	//  Function that returns the name from an assignment by id
	getAssignmentName = (assignmentID) => {
		const state = [...this.state.assignments];
		const name = state.find((assignment) => assignment.id === assignmentID);
		return name.name;
	};

	//  Function that returns all assignments that match the wanted assignment by id
	getDataFromSingleAssignment = (assignmentID) => {
		const state = [...this.state.gradings];
		const single = state.filter((item) => {
			return item.assignmentID === assignmentID;
		});
		return single;
	};

	// Function that seperates grades from the gradingsobject
	getGrades = (grades) => {
		const difficultyGrades = [];
		const enjoymentGrades = [];
		grades.forEach((item) => {
			difficultyGrades.push(item.difficultyGrade);
			enjoymentGrades.push(item.enjoymentGrade);
		});
		return { difficultyGrades, enjoymentGrades };
	};
	// Function that tries to set the average and return nested array or return empty array
	setCombinedAverage = (data) => {
		const combinedAvgGrades = [];
		try {
			const averageDifficultyGrade = this.getAverage(data.difficultyGrades);
			const averageenjoymentGrade = this.getAverage(data.enjoymentGrades);
			combinedAvgGrades.push(averageDifficultyGrade, averageenjoymentGrade);
		} finally {
			return combinedAvgGrades;
		}
	};

	//  Function that gets the average grades from all assignments. returns object with assignment name, difficulty grade and enjoyment grade
	getAverageFromAllAssignments = () => {
		//Wanted result: {assignmentName: "W1D1-1", avgDifficultyGrade: 4, AvgenjoymentGrade: 1}
		const state = { ...this.state };
		const names = [];

		const data = state.gradings.map((item) => {
			const name = this.getAssignmentName(item.assignmentID);
			if (!names.includes(name)) {
				names.push(name);
			}
			const singleAssignment = this.getDataFromSingleAssignment(item.id);
			let grades;
			if (singleAssignment.length > 0) {
				grades = this.getGrades(singleAssignment);
			}
			const combinedAvgGrades = this.setCombinedAverage(grades);
			return combinedAvgGrades;
		});

		const filteredData = data.filter((item) => {
			return item.length > 0 && item !== undefined;
		});

		const averageData = filteredData.map((data, index) => {
			return {
				assignmentName: names[index],
				difficultyGrade: data[0],
				enjoymentGrade: data[1],
			};
		});
		return averageData;
	};

	setAverageFromAll = () => {
		const data = this.getAverageFromAllAssignments();
		this.setState({
			graphData: data,
		});
	};

	// Loads all data into state
	loadDataIntoState = (data) => {
		const newStudents = this.getStudentState(data);
		const newAssignments = this.getAssignmentState(data);
		const newGradings = this.getGradingState(data, newStudents, newAssignments);
		this.setState(
			{
				students: newStudents,
				assignments: newAssignments,
				gradings: newGradings,
			},
			() => {
				this.setAverageFromAll();
			}
		);
	};

	componentDidMount() {
		this.loadDataIntoState(studentData);
	}

	render() {
		return (
			<Router>
				<main>
					<Dashboard
						className="filter-div"
						students={this.state.students}
						handlechange={this.studentSelectHandleChange}
						assignments={this.state.assignments}
						handlechangeAssignment={this.assignmentSelectHandleChange}
					/>
					<Switch>
						<Route
							exact
							path="/container/"
							render={(props) => (
								<React.Fragment>
									<Chart
										graphData={this.state.graphData}
										radioState={this.state.radioState}
										handleFilterChange={this.handleFilterChange}
									/>
								</React.Fragment>
							)}
						/>
						<Route
							path="/:id"
							render={(props) => (
								<Student
									{...props}
									studentInfo={this.getStudentInfo(props.match.params.id)}
									data={this.getGradesFromStudent(props.match.params.id)}
									radioState={this.state.radioState}
									handleFilterChange={this.handleFilterChange}
								/>
							)}
						/>
					</Switch>
				</main>
			</Router>
		);
	}
}

export default Container;
