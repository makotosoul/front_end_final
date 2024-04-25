import React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "../Training/AddTraining";
function CustomerList() {
	useEffect(() => {
		fetchCustomer();
	}, []);

	const [customers, setCustomers] = useState([]);
	const pagination = true;
	const [gridAPI, setGridAPI] = useState(null);
	const [colDefs] = useState([
		{
			cellRenderer: (params) => (
				<AddTraining saveTraining={saveTraining} training={params.data} />
			),
			width: 150,
		},
		{
			cellRenderer: (params) => (
				<Button
					size="small"
					color="error"
					onClick={() => deleteCustomer(params.data._links.customer.href)}
				>
					<DeleteIcon />
				</Button>
			),
			width: 100,
		},
		{
			cellRenderer: (params) => (
				<EditCustomer updateCustomer={updateCustomer} customer={params.data} />
			),
			width: 100,
		},
		{ field: "firstname", filter: true },
		{ field: "lastname", filter: true },
		{ field: "streetaddress", filter: true },
		{ field: "postcode", filter: true },
		{ field: "city", filter: true },
		{ field: "email", filter: true },
		{ field: "phone", filter: true },
	]);

	const fetchCustomer = async () => {
		try {
			const response = await fetch(
				"https://customerrestservice-personaltraining.rahtiapp.fi/api/customers",
			);
			if (!response.ok) {
				throw new Error("Error in fetch: " + response.statusText);
			}
			const data = await response.json();
			setCustomers(data._embedded.customers);
		} catch (err) {
			console.error(err);
		}
	};

	const deleteCustomer = async (url) => {
		if (window.confirm("Are you sure")) {
			try {
				const response = await fetch(url, { method: "DELETE" });
				if (!response.ok) {
					throw new Error("Error in fetch: " + response.statusText);
				}
				await fetchCustomer();
			} catch (err) {
				console.error(err);
			}
		}
	};
	const saveCustomer = async (customer) => {
		try {
			const response = await fetch(
				"https://customerrestservice-personaltraining.rahtiapp.fi/api/customers",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(customer),
				},
			);

			if (!response.ok) {
				throw new Error("Error in fetch: " + response.statusText);
			}
			await fetchCustomer();
		} catch (err) {
			console.error(err);
		}
	};
	const updateCustomer = async (customer, link) => {
		try {
			const response = await fetch(link, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(customer),
			});

			if (!response.ok) {
				throw new Error("Error in fetch: " + response.statusText);
			}
			await fetchCustomer();
		} catch (err) {
			console.error(err);
		}
	};
	const saveTraining = async (training) => {
		try {
			const response = await fetch(
				"https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(training),
				},
			);
			if (!response.ok) {
				throw new Error("Error in fetch: " + response.statusText);
			}
		} catch (err) {
			console.error(err);
		}
	};
	const onGridReady = (params) => {
		setGridAPI(params.api);
	};
	const exportToCSV = () => {
		const params = {
			columnKeys: [
				"firstname",
				"lastname",
				"streetaddress",
				"postcode",
				"city",
				"email",
				"phone",
			],
		};
		gridAPI.exportDataAsCsv(params);
	};
	return (
		<div className="ag-theme-quartz" style={{ height: "90vh" }}>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<AddCustomer saveCustomer={saveCustomer} />
				<Button variant="contained" color="success" onClick={exportToCSV}>
					<GetAppIcon /> Download as CSV
				</Button>
			</div>
			<AgGridReact
				onGridReady={onGridReady}
				rowData={customers}
				columnDefs={colDefs}
				pagination={pagination}
				modules={[CsvExportModule]}
			/>
		</div>
	);
}

export default CustomerList;
