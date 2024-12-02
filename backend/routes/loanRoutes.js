// routes/loanRoutes.js
const express = require("express");
const { requestLoan, getLoanHistory, getLoanDetails } = require("../controllers/loanController.js");
const { protect } = require("../middleware/authMiddleware.js");

const userRouter = express.Router();

// Protect middleware ensures that only authenticated users can access the routes
userRouter.post("/request", protect, requestLoan); // Route to request a new loan
userRouter.get("/history", protect, getLoanHistory); // Route to get loan history
userRouter.get("/:loanId", protect, getLoanDetails); // Route to get loan details by loan ID

module.exports = userRouter;
