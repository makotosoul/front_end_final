import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
function AddTraining(props) {
	let url = props.training._links.customer.href;
	const customerId = url.split("/");

	const [open, setOpen] = React.useState(false);
	const [training, setTraining] = React.useState({
		date: "",
		duration: "",
		activity: "",
		customer: "",
	});

	const handleClickOpen = () => {
		setTraining({
			...training,
			customer:
				"https://localhost:8080/api/customers/" +
				customerId[customerId.length - 1],
		});
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleInputChange = (e) => {
		setTraining({
			...training,
			[e.target.name]: e.target.value,
		});
	};

	const addTraining = () => {
		props.saveTraining(training);
		handleClose();
	};

	return (
		<React.Fragment>
			<Button onClick={handleClickOpen}>Add Training</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: "form",
					onSubmit: (event) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						const formJson = Object.fromEntries(formData.entries());
						const email = formJson.email;
						console.log(email);
						handleClose();
					},
				}}
			>
				<DialogTitle>New Training</DialogTitle>
				<DialogContent>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={["DatePicker"]}>
							<DatePicker
								autoFocus
								required
								margin="dense"
								name="date"
								value={training.date ? dayjs(training.date) : null}
								onChange={(newValue) => {
									setTraining({
										...training,
										date: dayjs(newValue).format("YYYY-MM-DD"),
									});
								}}
								label="Date"
								fullWidth
								variant="standard"
							/>
						</DemoContainer>
					</LocalizationProvider>
					<TextField
						required
						margin="dense"
						name="duration"
						value={training.duration}
						onChange={(e) => handleInputChange(e)}
						label="Duration"
						fullWidth
						variant="standard"
					/>
					<TextField
						required
						margin="dense"
						name="activity"
						value={training.activity}
						onChange={(e) => handleInputChange(e)}
						label="Activity"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={addTraining}>Save</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

export default AddTraining;
