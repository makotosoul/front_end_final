import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import CustomerList from "./components/Customer/CustomerList";
import TrainingList from "./components/Training/TrainingList";
import Calendar from "./components/Training/Calendar";
function App() {
	const [value, setValue] = React.useState("customerList");

	const handleChange = (event, newValue) => {
		setValue[newValue];
	};
	return (
		<BrowserRouter>
			<AppBar position="static">
				<Box sx={{ width: "100%" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						textColor="inherit"
						indicatorColor="inherit"
					>
						<Tab
							value="customerList"
							label={
								<>
									<PeopleAltIcon /> Customer List
								</>
							}
							component={Link}
							to="/"
						/>
						<Tab
							value="trainingList"
							label={
								<>
									<FitnessCenterIcon /> Training List
								</>
							}
							component={Link}
							to="/training"
						/>
						<Tab
							value="calendar"
							label={
								<>
									<CalendarMonthIcon />
									Calendar
								</>
							}
							component={Link}
							to="/calendar"
						/>
					</Tabs>
				</Box>
			</AppBar>
			<Routes>
				<Route path="/" exact Component={CustomerList} />
				<Route path="/training" exact Component={TrainingList} />
				<Route path="/calendar" extract Component={Calendar} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
