const express = require("express");
const router = express.Router();
const UserController = require("../controller/user-controller");

router.post("/login", UserController.auth);
router.post("/register", UserController.register);
module.exports = router;
