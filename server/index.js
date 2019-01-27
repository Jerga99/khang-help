const express = require("express");
const mongoose = require("mongoose");

const app = express();

const config = require("./config/dev");
const Rental = require("./models/rental");

const FakeDb = require("./models/fake-db");

const rentalRoutes = require("../server/routes/rentals");

const cors = require("cors");

app.use(cors());
mongoose
  .connect(
    config.DB_URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
    console.log("connected to the db");
  })
  .catch(err => console.log(err));
app.use("/api/rentals", rentalRoutes);

//
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("I am running");
});
