import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

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
	]);

	console.log(customers);
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
	return (
		<div className="ag-theme-quartz" style={{ height: 500 }}>
			<AgGridReact
				rowData={customers}
				columnDefs={colDefs}
				pagination={pagination}
			/>
		</div>
	);
}

export default CustomerList;
