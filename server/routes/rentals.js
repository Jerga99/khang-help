const express = require("express");
const router = express.Router();
const RentalController = require("../controller/rentals-controller");

router.get("", RentalController.get);
router.get("/:id", RentalController.getId);
module.exports = router;
