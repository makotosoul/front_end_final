import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
function TrainingList() {
	useEffect(() => {
		fetchTraining();
	}, []);

	const [training, setTraining] = useState([]);
	const pagination = true;

	const [colDefs] = useState([
		{
			cellRenderer: (params) => (
				<Button
					size="small"
					color="error"
					onClick={() => deleteTraining("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/"+params.data.id)}
				>
					<DeleteIcon/>
				</Button>
			),
			width: 100,
		},
		{
			headerName: "Date",
			valueGetter: (params) =>dayjs(params.data.date).format("DD.MM.YYYY HH:mm"),
			filter: true,
		},
		{ field: "duration", filter: true },
		{ field: "activity", filter: true },
		{
			headerName: "Customer's name",
			valueGetter: (params) =>
				params.data.customer.firstname + " " + params.data.customer.lastname,
			filter: true,
		},
	]);

	const fetchTraining = async () => {
		try {
			const response = await fetch(
				"https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings",
			);
			if (!response.ok) {
				throw new Error("Error in fetch: " + response.statusText);
			}
			const data = await response.json();
			setTraining(data);
		} catch (err) {
			console.error(err);
		}
	};
	const deleteTraining = async (url) => {
		if (window.confirm("Are you sure")) {
			try {
				const response = await fetch(url, { method: "DELETE" });
				if (!response.ok) {
					throw new Error("Error in fetch: " + response.statusText);
				}
				await fetchTraining();
			} catch (err) {
				console.error(err);
			}
		}
	};
	return (
		<div className="ag-theme-quartz" style={{ height: '90vh' }}>
			<AgGridReact
				rowData={training}
				columnDefs={colDefs}
				pagination={pagination}
			/>
		</div>
	);
}

export default TrainingList;
