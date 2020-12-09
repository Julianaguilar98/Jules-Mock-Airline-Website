import React from 'react';
import BookAirline from "../components/BookAirline";

const BookingPage = () => {
    return (
        <div>
            <h1 className="text-center">Book Airline</h1>
			<h5 className="text-left">Your Selected Flight:</h5>
            <BookAirline />
        </div>
    );
};

export default BookingPage;
