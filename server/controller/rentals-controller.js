const Rental = require("../models/rental");
const { normalizeErrors } = require("../helpers/mongoose");
const User = require("../models/user");

exports.get = (req, res) => {
  const city = req.query.city;
  const query = city ? { city: city.toLowerCase() } : {};
  // we don't want to get the bookings
  // we don't need bookings in the listing page
  Rental.find(query)
    .select("-bookings")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({
          errors: normalizeErrors(err.errors)
        });
      }

      if (city && foundRental.length === 0) {
        return res.status(422).send({
          err: [
            {
              title: "No Rentals Found!",
              detail: `There are no rentals for city ${city}`
            }
          ]
        });
      }
      return res.json(foundRental);
    });
};

exports.getId = (req, res) => {
  const rentalId = req.params.id;
  Rental.findById(rentalId)
    .populate("user", "username -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec((err, foundRental) => {
      if (err) {
        res.status(422).send({
          err: [{ title: "Rental Error!", detail: "Couldn't find Rental" }]
        });
      }
      return res.json(foundRental);
    });
};

exports.post = (req, res) => {
  const {
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate
  } = req.body;
  const user = res.locals.user;

  const rental = new Rental({
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate
  });

  rental.user = user;

  Rental.create(rental, (err, newRental) => {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    User.update({ _id: user.id }, { $push: { rentals: newRental } }, () => {});
    return res.json(newRental);
  });
};

exports.getSecret = (req, res) => {
  res.json({ secret: true });
};
