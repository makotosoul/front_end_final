import React, { useEffect, useState } from "react";
import { Calendar,Views , dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
const localizer = dayjsLocalizer(dayjs);

const CalendarComponent = () => {
	useEffect(() => {
		fetchTraining();
	}, []);

	const [training, setTraining] = useState([]);
	const fetchTraining = async () => {
		try {
			const response = await fetch(
				"https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings",
			);
			if (!response.ok) {
				throw new Error("Error in fetch: " + response.statusText);
			}
			const data = await response.json();
			const events = data.map((trainData) => ({
				start: dayjs(trainData.date).toDate(),
				end: dayjs(trainData.date).add(trainData.duration, "minute").toDate(),
				title: `${trainData.activity}/${trainData.customer.firstname} ${trainData.customer.lastname}`,
			}));
			setTraining(events);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="height600">
			<Calendar
				defaultView={Views.WEEK}
				localizer={localizer}
				events={training}
				startAccessor="start"
				endAccessor="end"
				style={{ height: '90vh' }}
			/>
		</div>
	);
};
export default CalendarComponent;
