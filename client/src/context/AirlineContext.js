import React, { useState, createContext } from "react";

export const AirlineContext = createContext();

export const AirlineContextProvider = (props) => {
    const [airlines, setAirline] = useState([]);
    const [selectedAirline, setSelectedAirline] = useState(null);

    const addAirline = (airline) => {
        setAirline([...airlines, airline]);
    };
    return (
        <AirlineContext.Provider
            value={{
                airlines,
                setAirline,
                addAirline,
                selectedAirline,
                setSelectedAirline,
            }}
        >
        {props.children}
        </AirlineContext.Provider>
    );
};