// routes/loanRoutes.js
const express = require("express");
const { createLoan, getUserLoans, approveLoan } = require("../controllers/loanController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Protect middleware ensures that only authenticated users can access the routes
router.post("/create", protect, createLoan); // Route to request a new loan
router.get("/history", protect, getUserLoans); // Route to get loan history
router.post("/approve", protect, approveLoan); // Route to approve a loan (admin functionality)

module.exports = router;
