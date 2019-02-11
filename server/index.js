const express = require("express");
const mongoose = require("mongoose");

const app = express();

const config = require("./config/dev");
const Rental = require("./models/rental");

const FakeDb = require("./models/fake-db");

const rentalRoutes = require("../server/routes/rentals"),
  userRoutes = require("../server/routes/users");
bookingRoute = require("../server/routes/bookings");
imageUploadRoute = require("../server/routes/image-upload");

const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
mongoose
  .connect(config.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    const fakeDb = new FakeDb();
    // fakeDb.seedDb();
    console.log("connected to the db");
  })
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use("/api/rentals", rentalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoute);
app.use("/api", imageUploadRoute);
//
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("I am running");
});
