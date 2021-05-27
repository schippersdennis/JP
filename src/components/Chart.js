import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryAxis,
  VictoryLabel,
  VictoryTooltip,
  VictoryLegend,
} from "victory";
import chartTheme from "./chartThemes";
import Filter from "./Filter";

const CustomTickLabel = (props) => {
  return <VictoryLabel {...props} />;
};

function Chart(props) {
  const graphDataWithLabels = props.graphData.map((item) => {
    return { ...item, label: item.assignmentName };
  });

  let graph = (
    <VictoryGroup offset={4}>
      <VictoryBar
        data={graphDataWithLabels}
        x="assignmentName"
        y="difficultyGrade"
        tickValues={[1, 2, 3, 4, 5]}
        tickFormat={props.graphData.map((item) => item.assignmentName)}
        labelComponent={<VictoryTooltip />}
      />
      <VictoryBar
        data={graphDataWithLabels}
        x="assignmentName"
        y="enjoymentGrade"
        tickValues={[1, 2, 3, 4, 5]}
        tickFormat={props.graphData.map((item) => item.assignmentName)}
        labelComponent={<VictoryTooltip />}
      />
    </VictoryGroup>
  );

  if (props.graphData.length > 0 && props.radioState) {
    if (
      props.radioState.difficulty === true &&
      props.radioState.enjoyment === true
    ) {
      graph = (
        <VictoryGroup offset={4}>
          <VictoryBar
            data={graphDataWithLabels}
            x="assignmentName"
            y="difficultyGrade"
            tickValues={[1, 2, 3, 4, 5]}
            tickFormat={props.graphData.map((item) => item.assignmentName)}
            labelComponent={<VictoryTooltip />}
          />
          <VictoryBar
            data={graphDataWithLabels}
            x="assignmentName"
            y="enjoymentGrade"
            tickValues={[1, 2, 3, 4, 5]}
            tickFormat={props.graphData.map((item) => item.assignmentName)}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryGroup>
      );
    } else if (
      props.radioState.difficulty === true &&
      props.radioState.enjoyment === false
    ) {
      graph = (
        <VictoryGroup offset={4}>
          <VictoryBar
            data={graphDataWithLabels}
            x="assignmentName"
            y="difficultyGrade"
            tickValues={[1, 2, 3, 4, 5]}
            tickFormat={props.graphData.map((item) => item.assignmentName)}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryGroup>
      );
    } else if (
      props.radioState.difficulty === false &&
      props.radioState.enjoyment === true
    ) {
      graph = (
        <VictoryGroup offset={4}>
          <VictoryBar
            data={graphDataWithLabels}
            x="assignmentName"
            y="enjoymentGrade"
            tickValues={[1, 2, 3, 4, 5]}
            tickFormat={props.graphData.map((item) => item.assignmentName)}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryGroup>
      );
    }
  }

  return (
    <div className="chart" style={{ position: "relative", zIndex: "1" }}>
      <h3>Average of all students per assignment</h3>
      <Filter handleFilterChange={props.handleFilterChange} />
      <VictoryChart domainPadding={25} theme={chartTheme}>
        {graph}
        <VictoryLegend
          x={100}
          y={40}
          orientation="horizontal"
          gutter={20}
          style={{ title: { fontSize: 10 } }}
          data={[
            { name: "Difficulty", symbol: { fill: "#ababab" } },
            { name: "Enjoyment", symbol: { fill: "#4f8ac9" } },
          ]}
        />
        <VictoryAxis
          tickLabelComponent={
            <CustomTickLabel angle={45} textAnchor={"start"} />
          }
          tickFormat={props.graphData.map((item) => item.assignmentName)}
        />
        <VictoryAxis dependentAxis tickValues={[1, 2, 3, 4, 5]} />
      </VictoryChart>
    </div>
  );
}

export default Chart;
