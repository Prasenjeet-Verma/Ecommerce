const express = require("express");
const paymentRouter = express.Router();
const paymentController = require("../controller/paymentController");

paymentRouter.get("/payment-success", paymentController.paymentSuccess);

module.exports = paymentRouter;
