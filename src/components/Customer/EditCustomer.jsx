import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from '@mui/icons-material/Edit';
function EditCustomer(props) {
	const [open, setOpen] = React.useState(false);
	const [customer, setCustomer] = React.useState({
		firstname: "",
		lastname: "",
		streetaddress: "",
		postcode: "",
		city: "",
		email: "",
		phone: "",
	});

	const handleClickOpen = () => {
		setCustomer({
			firstname: props.customer.firstname,
			lastname:props.customer.lastname ,
			streetaddress: props.customer.streetaddress,
			postcode: props.customer.postcode,
			city: props.customer.city,
			email: props.customer.email,
			phone: props.customer.phone,
		});
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleInputChange = (e) => {
		setCustomer({
			...customer,
			[e.target.name]: e.target.value,
		});
	};

	const updateCustomer = () => {
		props.updateCustomer(customer, props.customer._links.customer.href);
		handleClose();
	};

	return (
		<React.Fragment>
			<Button onClick={handleClickOpen} color="secondary"><EditIcon/> </Button>
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
				<DialogTitle>Edit Customer</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						required
						margin="dense"
						name="firstname"
						value={customer.firstname}
						onChange={(e) => handleInputChange(e)}
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
						onChange={(e) => handleInputChange(e)}
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
						onChange={(e) => handleInputChange(e)}
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
						onChange={(e) => handleInputChange(e)}
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
						onChange={(e) => handleInputChange(e)}
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
						onChange={(e) => handleInputChange(e)}
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
						onChange={(e) => handleInputChange(e)}
						label="Phone"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={updateCustomer}>Save</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

export default EditCustomer;
