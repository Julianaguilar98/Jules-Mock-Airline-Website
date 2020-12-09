require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());

		//when a "GET" request is made to the homepage ( /api/v1/airlines )
		//run a query and save as json data, and print status
app.get("/api/v1/airlines", async (req, res) => {
  try {
    const MakeAirlineTable = await db.query(
      "select * from flights;"
    );

    res.status(200).json({
      status: "success",
      results: MakeAirlineTable.rows.length,
      data: {
        airlines: MakeAirlineTable.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

/*app.get("/api/v1/airlines", async (req, res) => {
  try {
    const airlineRatingsData = await db.query(
      "select * from airlines left join (select airlines_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by airline_id) reviews on airlines.id = reviews.airline_id"
    );

    res.status(200).json({
      status: "success",
      results: airlineRatingsData.rows.length,
      data: {
        airlines: airlineRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});*/

app.get("/api/v1/airlines/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const selectFlight = await db.query(
      "select * from flights where flight_id = $1",
      [req.params.id]
    );
    console.log(selectFlight);

    res.status(200).json({
      status: "success",
      data: {
        airlines: selectFlight.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a airline

/*app.post("/api/v1/airlines", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO flights (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        airline: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});*/

// Update airline

app.put("/api/v1/airlines/:id", async (req, res) => {
  try {
    const InsertIntoTicket = await db.query(
    //  "INSERT INTO ticket SET ticket_no = $1, book_ref = $2, passenger_id = $3, passenger_name = $4, email = $5, phone = $6, address = $7, credit_card = $8",
	"INSERT INTO ticket VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
      [req.body.ticket_no, req.body.book_ref, req.body.passenger_id, req.body.Name, req.body.Email, req.body.Phone, req.body.Address, req.body.Credit_Card]
    );
	
    const InsertIntoBookings = await db.query(	
		"INSERT INTO bookings VALUES($1, NULL, 0)",
		[req.body.book_ref]
	);
	
	const UpdateFlights = await db.query(
		"UPDATE flights SET seats_available=seats_available-1, seats_booked=seats_booked+1 WHERE flight_id = $1",
		[req.params.id]
	);

    res.status(200).json({
      status: "success",
      data: {
        ticketResponse: InsertIntoTicket.rows[0],
		bookingsResponse: InsertIntoBookings.rows[0],
		flightsResponse: UpdateFlights.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete airline

/*app.delete("/api/v1/airlines/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM flights where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});*/

/*app.post("/api/v1/airlines/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (airline_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});*/

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
