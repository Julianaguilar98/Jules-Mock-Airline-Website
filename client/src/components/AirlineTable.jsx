import React, {useEffect, useContext} from 'react'
import AirportFinder from "../apis/AirportFinder";
import { AirlineContext } from "../context/AirlineContext";
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router'

const AirlineTable = (props) => {
	const {airlines, setAirline} = useContext(AirlineContext);
	const history = useHistory();
	useEffect(() => {
		const fetchTableData = async() => {
			try{
				const tableResponse = await AirportFinder.get("/");
				setAirline(tableResponse.data.data.airlines)
			} catch(err){}
		};
		
		fetchTableData();
	},[]);

	const handleBooking = (e, id) => {
		e.stopPropagation();
		history.push(`/airlines/${id}/booking`);
	};

	return(
		<div className="list-group">
			<table className="table table-hover table-dark">
			  <thead>
				<tr className="bg-secondary">
					<th scope="col">Flight#</th>
					<th scope="col">From</th>
					<th scope="col">To</th>
					<th scope="col">Departure</th>
					<th scope="col">Arrival</th>
					<th scope="col">Seats Available</th>
					<th scope="col">Book</th>
				</tr>
			  </thead>
				<tbody>
					{airlines && airlines.map((airline) => {
						return(
						<tr key={airline.flight_id}>
							<td>{airline.flight_no}</td>
							<td>{airline.departure_airport}</td>
							<td>{airline.arrival_airport}</td>
							<td>{airline.scheduled_departure}</td>
							<td>{airline.scheduled_arrival}</td>
							<td>{airline.seats_available}</td>
							<td>
							    <button
								onClick={(e)=> handleBooking(e, airline.flight_id)}
								className="btn btn-secondary"
								>
								Book
								</button>
							</td>
						</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default withRouter(AirlineTable);