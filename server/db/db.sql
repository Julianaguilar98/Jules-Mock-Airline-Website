/* create database booking;
    \c booking; then copy whole sql.txt */
BEGIN;

CREATE TABLE aircraft(
    aircraft_code char(3),
    model char(25),
    RANGE integer,
    PRIMARY KEY(aircraft_code),
    CONSTRAINT "flights_aircraft_code_fkey" FOREIGN KEY (aircraft_code) REFERENCES aircraft(aircraft_code),
    CONSTRAINT "seats_aircraft_code_fkey" FOREIGN KEY (aircraft_code) REFERENCES aircraft(aircraft_code) ON DELETE CASCADE
);
	
CREATE TABLE airport (
    airport_code char(3) NOT NULL,
    airport_name char(40),
    city char(20),
    coordinates point,
    timezone text,
    PRIMARY KEY (airport_code)
    /*
     ,CONSTRAINT "flights_arrival_airport_fkey"
     FOREIGN KEY (arrival_airport)
     REFERENCES airport(airport_code)
     ,CONSTRAINT "seats_aircraft_code_fkey" FOREIGN KEY (aircraft_code)
     REFERENCES aircraft(aircraft_code) ON DELETE CASCADE
     */
);

CREATE TABLE flights (
    flight_id integer NOT NULL,
    flight_no character(6) NOT NULL,
    scheduled_departure timestamp WITH time zone NOT NULL,
    scheduled_arrival timestamp WITH time zone NOT NULL,
    departure_airport character(3) NOT NULL,
    arrival_airport character(3) NOT NULL,
    STATUS character varying(20) NOT NULL,
    aircraft_code character(3) NOT NULL,
    seats_available integer NOT NULL,
    seats_booked integer NOT NULL,
    PRIMARY KEY (flight_id),
    CONSTRAINT flights_aircraft_code_fkey FOREIGN KEY (aircraft_code) REFERENCES aircraft(aircraft_code),
    CONSTRAINT flights_arrival_airport_fkey FOREIGN KEY (arrival_airport) REFERENCES airport(airport_code),
    CONSTRAINT flights_departure_airport_fkey FOREIGN KEY (departure_airport) REFERENCES airport(airport_code),
    CONSTRAINT flights_check CHECK ((scheduled_arrival > scheduled_departure)),
    /*
     CONSTRAINT flights_check1 CHECK (
         (
             (actual_arrival IS NULL)
             OR (
                 (actual_departure IS NOT NULL)
                 AND (actual_arrival IS NOT NULL)
                 AND (actual_arrival > actual_departure)
             )
         )
     ),
     */
    CONSTRAINT flights_status_check CHECK (
        (
            (STATUS)::text = ANY (
                ARRAY [('On Time'::character varying)::text, ('Delayed'::character varying)::text, ('Departed'::character varying)::text, ('Arrived'::character varying)::text, ('Scheduled'::character varying)::text, ('Cancelled'::character varying)::text]
            )
        )
    )
);

CREATE TABLE bookings (
    book_ref character(6) NOT NULL,
    book_date timestamp WITH time zone,
    total_amount numeric(10, 2) NOT NULL,
    PRIMARY KEY(book_ref)
);

CREATE TABLE ticket(
    ticket_no char(13) NOT NULL,
    book_ref character(6) NOT NULL,
    passenger_id varchar(20) NOT NULL,
    passenger_name text NOT NULL,
    email char(50),
    phone char(15),
	address text,
	credit_card text,
    PRIMARY KEY (ticket_no),
    CONSTRAINT "tickets_book_ref_fkey" FOREIGN KEY (book_ref) REFERENCES bookings(book_ref)
);

CREATE TABLE ticket_flights (
    ticket_no character(13) NOT NULL,
    flight_id integer NOT NULL,
    fare_conditions character varying(10) NOT NULL,
    amount numeric(10, 2) NOT NULL,
    PRIMARY KEY (ticket_no, flight_id),
    CONSTRAINT ticket_flights_flight_id_fkey FOREIGN KEY (flight_id) REFERENCES flights(flight_id),
    CONSTRAINT ticket_flights_ticket_no_fkey FOREIGN KEY (ticket_no) REFERENCES ticket(ticket_no),
    CONSTRAINT ticket_flights_amount_check CHECK ((amount >= (0)::numeric)),
    CONSTRAINT ticket_flights_fare_conditions_check CHECK (
        (
            (fare_conditions)::text = ANY (
                ARRAY [('Economy'::character varying)::text, ('Comfort'::character varying)::text, ('Business'::character varying)::text]
            )
        )
    )
);



/* INSERT VALUES */
/*airport table */
INSERT INTO airport
VALUES (
        'HOU',
        'George Bush Airport',
        'Houston',
        NULL,
        'CT'
    );

INSERT INTO airport
VALUES (
        'JFK',
        'John F Kennedy Airport',
        'New York',
        NULL,
        'ET'
    );

INSERT INTO airport
VALUES (
        'LAX',
        'Los Angeles Airport',
        'Los Angeles',
        NULL,
        'PT'
    );

INSERT INTO airport
VALUES ('ORD', 'O Hare Airport', 'Chicago', NULL, 'CT');

INSERT INTO airport
VALUES ('MIA', 'Miami Airport', 'Miami', NULL, 'ET');

/*aircraft*/
INSERT INTO aircraft
VALUES ('773', 'Boeing 777-300', 11100);

INSERT INTO aircraft
VALUES ('763', 'Boeing 767-300', 7900);

INSERT INTO aircraft
VALUES ('SU9', 'Boeing 777-300', 5700);

INSERT INTO aircraft
VALUES ('320', 'Boeing 777-300', 6400);

INSERT INTO aircraft
VALUES ('321', 'Boeing 777-300', 6100);

/*flights table*/
INSERT INTO flights
VALUES (
        1001,
        'PG0010',
        '2020-11-10 09:50:00+03',
        '2020-11-10 14:55:00+03',
        'HOU',
        'JFK',
        'Scheduled',
        '773',
        50,
        0
    );

INSERT INTO flights
VALUES (
        1002,
        'PG0020',
        '2020-11-11 09:50:00+03',
        '2020-11-11 15:55:00+03',
        'LAX',
        'JFK',
        'Scheduled',
        '763',
        50,
        0
    );

INSERT INTO flights
VALUES (
        1003,
        'PG0030',
        '2020-11-11 09:50:00+03',
        '2020-11-11 16:55:00+03',
        'ORD',
        'MIA',
        'Scheduled',
        'SU9',
        50,
        0
    );

INSERT INTO flights
VALUES (
        1004,
        'PG0040',
        '2020-11-12 09:50:00+03',
        '2020-11-12 12:55:00+03',
        'JFK',
        'ORD',
        'Scheduled',
        '320',
        50,
        0
    );

INSERT INTO flights
VALUES (
        1005,
        'PG0050',
        '2020-11-12 09:50:00+03',
        '2020-11-12 12:55:00+03',
        'MIA',
        'LAX',
        'Scheduled',
        '321',
        50,
        0
    );

INSERT INTO flights
VALUES (
        1006,
        'PG0060',
        '2020-11-13 09:50:00+03',
        '2020-11-13 12:55:00+03',
        'JFK',
        'HOU',
        'Scheduled',
        '773',
        50,
        0
    );

INSERT INTO flights
VALUES (
        1007,
        'PG0070',
        '2020-11-14 09:50:00+03',
        '2020-11-14 12:55:00+03',
        'JFK',
        'LAX',
        'Scheduled',
        '763',
        50,
        0
    );

INSERT INTO flights
VALUES (
        1008,
        'PG0080',
        '2020-11-14 09:50:00+03',
        '2020-11-14 16:55:00+03',
        'MIA',
        'ORD',
        'Scheduled',
        'SU9',
        50,
        0
    );

INSERT INTO flights
VALUES (
        1009,
        'PG0090',
        '2020-11-15 09:50:00+03',
        '2020-11-15 12:55:00+03',
        'ORD',
        'JFK',
        'Scheduled',
        '320',
        50,
        0
    );

INSERT INTO flights
VALUES (
        1010,
        'PG0100',
        '2020-11-12 09:50:00+03',
        '2020-11-12 12:55:00+03',
        'LAX',
        'MIA',
        'Scheduled',
        '321',
        50,
        0);
		
COMMIT;