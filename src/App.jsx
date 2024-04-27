import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";
import Typography from "@mui/material/Typography";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import CustomerList from "./components/Customer/CustomerList";
import TrainingList from "./components/Training/TrainingList";
import Calendar from "./components/Training/Calendar";
import Statistic from "./components/Training/Statistic";

function App() {
	const [state, setState] = React.useState({
		left: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setState({ ...state, [anchor]: open });
	};

	const list = () => (
		<List>
			<ListItemButton component={Link} to="/">
				<PeopleAltIcon />
				<ListItemText primary="Customer List" />
			</ListItemButton>
			<ListItemButton component={Link} to="/training">
				<FitnessCenterIcon />
				<ListItemText primary="Training List" />
			</ListItemButton>
			<ListItemButton component={Link} to="/calendar">
				<CalendarMonthIcon />
				<ListItemText primary="Calendar" />
			</ListItemButton>
			<ListItemButton component={Link} to="/statistic">
				<BarChartIcon />
				<ListItemText primary="Statistic" />
			</ListItemButton>
		</List>
	);
	return (
		<BrowserRouter>
			<AppBar position="static">
				<Toolbar>
					{["left"].map((anchor) => (
						<React.Fragment key={anchor}>
							<IconButton
								edge="start"
								color="inherit"
								aria-label="menu"
								onClick={toggleDrawer(anchor, true)}
							>
								<MenuIcon />
							</IconButton>
							<Drawer
								anchor="left"
								open={state["left"]}
								onClose={toggleDrawer("left", false)}
							>
								{list()}
							</Drawer>
						</React.Fragment>
					))}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Personal Trainer
					</Typography>
				</Toolbar>
			</AppBar>
			<Routes>
				<Route path="/" exact Component={CustomerList} />
				<Route path="/training" exact Component={TrainingList} />
				<Route path="/calendar" exact Component={Calendar} />
				<Route path="/statistic" exact Component={Statistic} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
