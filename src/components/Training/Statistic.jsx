import React, { PureComponent } from "react";
import { useState, useEffect } from "react";
import {
	BarChart,
	Bar,
	Rectangle,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { sumBy } from "lodash";
import { groupBy } from "lodash";
function Statistic() {
	      useEffect(() => {
		      fetchTraining();
	      }, []);
	      const [chartData, setChartData] = useState([]);
	      const fetchTraining = async () => {
		      try {
			      const response = await fetch(
				      "https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings",
			      );
			      if (!response.ok) {
				      throw new Error("Error in fetch: " + response.statusText);
			      }
			      const data = await response.json();
			      const groupActivity = groupBy(data, "activity");
			      const chartArray = Object.entries(groupActivity).map(
				      ([activity, data]) => ({
					      name: activity,
					      Duration: sumBy(data, "duration"),
				      }),
			      );
			      setChartData(chartArray);
		      } catch (err) {
			      console.error(err);
		      }
	      };
	      console.log(chartData);
	      return (
		      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
		      <ResponsiveContainer width="100%" height={800}>
			      <BarChart
				      width={500}
				      height={300}
				      data={chartData}
				      margin={{
					      top: 5,
					      right: 30,
					      left: 20,
					      bottom: 5,
				      }}
			      >
				      <CartesianGrid strokeDasharray="3 3" />
				      <XAxis dataKey="name" />
				      <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} /><Tooltip />
				      <Bar
					      dataKey="Duration"
					      fill="#8884d8"
					      activeBar={<Rectangle fill="pink" stroke="blue" />}
				      />
			      </BarChart>
		      </ResponsiveContainer>
		      </div>
	      );
}
export default Statistic;
