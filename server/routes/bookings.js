const express = require("express");
const router = express.Router();
const BookingController = require("../controller/booking-controller");
const UserController = require("../controller/user-controller");

router.post("", UserController.authMiddleware, BookingController.create);
module.exports = router;
