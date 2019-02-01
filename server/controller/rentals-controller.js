const Rental = require("../models/rental");
exports.get = (req, res) => {
  Rental.find({})
    // we don't want to get the bookings
    // we don't need bookings in the listing page
    .select("-bookings")
    .exec((err, foundRental) => {
      if (err) {
      }
      res.json(foundRental);
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

exports.getSecret = (req, res) => {
  res.json({ secret: true });
};
