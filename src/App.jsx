import CustomerList from "./components/CustomerList";
import TrainerList from "./components/TrainerList";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
	return (
		<Container maxWidth="xl">
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">Customer List</Typography>
				</Toolbar>
			</AppBar>
		<TrainerList/>
		</Container>
	);
}

export default App;
