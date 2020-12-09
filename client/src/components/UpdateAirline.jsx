import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AirlineContext } from "../context/AirlineContext";
import AirportFinder from "../apis/AirportFinder";

const UpdateAirline = (props) => {
    const { id } = useParams();
    let history = useHistory();
    const { airline } = useContext(AirlineContext);
    const [departure_airport, setDepartureAirport] = useState("");
    const [arrival_airport, setArrivalAirport] = useState("");

    useEffect(() => {
    const fetchData = async () => {
        const response = await AirportFinder.get(`/${id}`);
        console.log(response.data.data);
        setDepartureAirport(response.data.data.airline.name);
        setArrivalAirport(response.data.data.airline.location);
    };

    fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const UpdateAirline = await AirportFinder.put(`/${id}`, {
            departure_airport,
            arrival_airport,
        });
        history.push("/");
    };

    return (
    <div>
        <form action="">
            <div className="form-group">
                <label htmlFor="departure_airport">departure_airport</label>
                <input
                    value={departure_airport}
                    onChange={(e) => setDepartureAirport(e.target.value)}
                    id="departure_airport"
                    className="form-control"
                    type="text"
                />
            </div>

            <div className="form-group">
                <label htmlFor="arrival_airport">arrival_airport</label>
                <input
                    value={arrival_airport}
                    onChange={(e) => setArrivalAirport(e.target.value)}
                    id="arrival_airport"
                    className="form-control"
                    type="text"
                />
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
            >
                Submit
            </button>
        </form>
    </div>
    );
};

export default UpdateAirline;