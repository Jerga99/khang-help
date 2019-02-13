const express = require("express");
const router = express.Router();
const UserController = require("../controller/user-controller");

const PaymentController = require('../controller/payment-controller')

router.get(
    "",
    UserController.authMiddleware,
    PaymentController.getPendingPayment
);
module.exports = router;
