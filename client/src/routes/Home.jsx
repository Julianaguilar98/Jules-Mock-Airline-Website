import React from "react";
import AddAirline from "../components/AddAirline";
import Header from "../components/Header";
import AirlineList from "../components/AirlineList";
import AirlineTable from "../components/AirlineTable";

const Home = () => {
    return (
        <div>
            <Header />
            <AddAirline />
            {/*<AirlineList />*/}
			<AirlineTable />
        </div>
    );
};

export default Home;
