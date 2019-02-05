const express = require("express");
const router = express.Router();
const RentalController = require("../controller/rentals-controller");
const UserController = require("../controller/user-controller");

router.get(
  "/secret",
  UserController.authMiddleware,
  RentalController.getSecret
);
router.get("", UserController.authMiddleware, RentalController.get);
router.get("/:id", RentalController.getId);
router.post("", UserController.authMiddleware, RentalController.post);
module.exports = router;
