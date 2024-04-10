import React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
function CustomerList() {
	useEffect(() => {
		fetchCustomer();
	}, []);

	const [customers, setCustomers] = useState([]);
	const pagination = true;

	const [colDefs] = useState([
		{ field: "firstname", filter: true },
		{ field: "lastname", filter: true },
		{ field: "streetaddress", filter: true },
		{ field: "postcode", filter: true },
		{ field: "city", filter: true },
		{ field: "email", filter: true },
		{ field: "phone", filter: true },
		{
			cellRenderer: (params) => (
				<Button
					size="small"
					color="error"
					onClick={() => deleteCustomer(params.data._links.customer.href)}
				>
					Delete
				</Button>
			),
			width: 150,
		},
		{
			cellRenderer: (params) => (
				<EditCustomer updateCustomer={updateCustomer} customer = {params.data}/>
			),
			width: 150,
		},
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
	const updateCustomer = async (customer,link) => {
		try {
			const response = await fetch(
				link,
				{
					method: "PUT",
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
	return (
		<div className="ag-theme-quartz" style={{ height: 500 }}>
		<AddCustomer saveCustomer={saveCustomer}/>
			<AgGridReact
				rowData={customers}
				columnDefs={colDefs}
				pagination={pagination}
			/>
		</div>
	);
}

export default CustomerList;
