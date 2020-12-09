import React, { useEffect, useContext } from "react";
import AirportFinder from "../apis/AirportFinder";
import { AirlineContext } from "../context/AirlineContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const AirlineList = (props) => {
  const { airlines, setAirlines } = useContext(AirlineContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AirportFinder.get("/");
        console.log(response.data.data);
        setAirlines(response.data.data.airlines);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await AirportFinder.delete(`/${id}`);
      setAirlines(
        airlines.filter((airline) => {
          return airline.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/airlines/${id}/update`);
  };

  const handleAirlineSelect = (id) => {
    history.push(`/airlines/${id}`);
  };

  const renderRating = (airline) => {
    if (!airline.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={airline.id} />
        <span className="text-warning ml-1">({airline.count})</span>
      </>
    );
  };
  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Flight#</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Departure</th>
            <th scope="col">Arrival</th>
            <th scope="col">Seats Available</th>
            <th scope="col">Book</th>
          </tr>
        </thead>
        {/*<tbody>
          {airlines &&
            airlines.map((airline) => {
              return (
                <tr
                  onClick={() => handleAirlineSelect(airline.id)}
                  key={airline.id}
                >
                  <td>{airline.departure_airport}</td>
                  <td>{airline.arrival_airport}</td>
                  <td>{renderRating(airline)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, airline.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, airline.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>*/}
      </table>
    </div>
  );
};
export default AirlineList;