import React, { useState, useContext } from "react";
import AirportFinder from "../apis/AirportFinder";
import { AirlineContext } from "../context/AirlineContext";

const AddAirline = () => {
  const { addAirline } = useContext(AirlineContext);
  const [departure_airport, setDepartureAirport] = useState("");
  const [arrival_airport, setArrivalAirport] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AirportFinder.post("/", {
        departure_airport,
        arrival_airport,
      });
      console.log(response.data.data);
      addAirline(response.data.data.airline);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={departure_airport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              type="text"
              className="form-control"
              placeholder="departure_airport"
            />
          </div>
          <div className="col">
            <input
              value={arrival_airport}
              onChange={(e) => setArrivalAirport(e.target.value)}
              className="form-control"
              type="text"
              placeholder="arrival_airport"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAirline;