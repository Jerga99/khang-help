const Booking = require("../models/booking");
const Rental = require("../models/rental");
const { normalizeErrors } = require("../helpers/mongoose");
const moment = require("moment");
const User = require("../models/user");

exports.getUserBookings = (req, res) => {
  const user = res.locals.user;

  // key and value is the same so we can just write user here
  Booking.where({ user })
    .populate("rentals")
    .exec((err, foundBookings) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundBookings);
    });
};

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
      if (isValidBooking(booking, foundRental)) {
        booking.user = user;
        booking.rental = foundRental;
        foundRental.bookings.push(booking);

        booking.save(err => {
          if (err) {
            return res.status(422).send({
              errors: normalizeErrors(err.errors)
            });
          }
          foundRental.save();
          User.update(
            { _id: user.id },
            { $push: { bookings: booking }, function() {} }
          );
          return res.json({ startAt: booking.startAt, endAt: booking.endAt });
        });

        // UPDATE rental update user
      } else {
        return res.status(422).send({
          err: [
            {
              title: "Invalid Booking!",
              detail: "Choosen dates are already taken"
            }
          ]
        });
      }
    });
};

isValidBooking = (proposedBooking, rental) => {
  let isValid = true;
  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(booking => {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return (
        (actualStart < proposedStart && actualEnd < proposedStart) ||
        (proposedEnd < actualEnd && proposedEnd < actualStart)
      );
    });
  }

  return isValid;
};
