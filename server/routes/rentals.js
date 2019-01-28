const express = require("express");
const router = express.Router();
const RentalController = require("../controller/rentals-controller");
const UserController = require("../controller/user-controller");

router.get(
  "/secret",
  UserController.authMiddleware,
  RentalController.getSecret
);
router.get("", RentalController.get);
router.get("/:id", RentalController.getId);
module.exports = router;
