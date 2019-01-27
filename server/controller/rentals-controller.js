const Rental = require("../models/rental");

exports.get = (req, res) => {
  Rental.find({}, function(err, foundRentals) {
    res.json(foundRentals);
  });
};

exports.getId = (req, res) => {
  const rentalId = req.params.id;
  console.log(rentalId);
  Rental.findById(rentalId, function(err, foundRentals) {
    if (err) {
      res
        .status(422)
        .send({
          err: [{ title: "Rental Error!", detail: "Couldn't find Rental" }]
        });
    }

    res.json(foundRentals);
  });
};
