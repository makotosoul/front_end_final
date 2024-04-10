import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import CustomerList from "./components/Customer/CustomerList"
import TrainingList from "./components/Training/TrainingList"
function App() {
	const [value, setValue] = React.useState("customerList");

	const handleChange = (event, newValue) => {
		setValue[newValue];

	};
	return (
		<BrowserRouter>
			<Container maxWidth="xl">
				<AppBar position="static">
					<Box sx={{ width: "100%" }}>
						<Tabs
							value={value}
							onChange={handleChange}
							textColor="inherit"
							indicatorColor="inherit"
						>
							<Tab value="customerList" label="Customer List" component={Link} to="/" />
							<Tab value="trainingList" label="Training List" component={Link} to="/training"/>
						</Tabs>
					</Box>
				</AppBar>
			</Container>
			<Routes>
				<Route path="/" exact Component={CustomerList} />
				<Route path="/training" exact Component={TrainingList} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
