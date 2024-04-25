import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from '@mui/icons-material/Add';

function AddCustomer(props) {
	const [open, setOpen] = React.useState(false);

	const[customer, setCustomer] = React.useState({
		firstname: "", lastname: "",streetaddress: "", postcode: "", city: "", email: "",phone:""
	})



	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	
	const handleInputChange = (e) =>{
		setCustomer({
			...customer,[e.target.name]: e.target.value
		});
	};

	const addCustomer =() =>{
		props.saveCustomer(customer);
		handleClose();
	}

	return (
		<React.Fragment>
			<Button variant="contained" onClick={handleClickOpen}>
				<AddIcon/> Add Customer
			</Button>
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
				<DialogTitle>New Customer</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						required
						margin="dense"
						name="firstname"
						value={customer.firstname}
						onChange={e => handleInputChange(e)}
						label="Firstname"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						required
						margin="dense"
						name="lastname"
						value={customer.lastname}
						onChange={e => handleInputChange(e)}
						label="Lastname"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						required
						margin="dense"
						name="streetaddress"
						value={customer.streetaddress}
						onChange={e => handleInputChange(e)}
						label="Streetaddress"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						required
						margin="dense"
						name="postcode"
						value={customer.postcode}
						onChange={e => handleInputChange(e)}
						label="Postcode"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						required
						margin="dense"
						name="city"
						value={customer.city}
						onChange={e => handleInputChange(e)}
						label="City"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						required
						margin="dense"
						name="email"
						value={customer.email}
						onChange={e => handleInputChange(e)}
						label="Email"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						required
						margin="dense"
						name="phone"
						value={customer.phone}
						onChange={e => handleInputChange(e)}
						label="Phone"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={addCustomer}>Save</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

export default AddCustomer;
