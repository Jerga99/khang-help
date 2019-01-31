const Booking = require("../models/booking");
const Rental = require("../models/rental");
const { normalizeErrors } = require("../helpers/mongoose");

exports.create = (req, res) => {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;

  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    guests,
    days
  });

  Rental.findById(rental._id)
    .populate("bookings")
    .populate("user")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({
          errors: normalizeErrors(err.errors)
        });
      }

      if (foundRental.user.id === user.id) {
        return res.status(422).send({
          err: [
            {
              title: "Invalid User!",
              detail: "Can't create a booking in your own Rental"
            }
          ]
        });
      }

      // check here for valid booking

      return res.json({ booking, foundRental });
    });
};
