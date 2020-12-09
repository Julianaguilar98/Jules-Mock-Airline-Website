import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AirlineContext } from "../context/AirlineContext";
import AirportFinder from "../apis/AirportFinder";

const AirlineDetailPage = () => {
    const { id } = useParams();
    const { selectedAirline, setSelectedAirline } = useContext(AirlineContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AirportFinder.get(`/${id}`);
				console.log(response);

                setSelectedAirline(response.data.data.airlines);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    return (
		<div>{selectedAirline.flight_no}</div>
	/*<div>
            {selectedAirline && (
            <>
                <h1 className="text-center display-1">
                    {selectedAirline.airline.flight_id}
                </h1>
            </>
        )}
	</div>*/
    );
};

export default AirlineDetailPage;