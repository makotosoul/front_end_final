import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import CustomerList from "./components/CustomerList";
import TrainerList from "./components/TrainerList";
function App() {
	const [value, setValue] = React.useState();

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
							<Tab value="trainerList" label="Trainer List" component={Link} to="/trainer"/>
						</Tabs>
					</Box>
				</AppBar>
			</Container>
			<Routes>
				<Route path="/" exact Component={CustomerList} />
				<Route path="/trainer" exact Component={TrainerList} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
