// routes/loanRoutes.js
import express from "express";
import { requestLoan, getLoanHistory, getLoanDetails } from "../controllers/loanController.js";
import { protect } from "../middleware/authMiddleware.js"; // Middleware to protect routes

const router = express.Router();

// Protect middleware ensures that only authenticated users can access the routes
router.post("/request", protect, requestLoan); // Route to request a new loan
router.get("/history", protect, getLoanHistory); // Route to get loan history
router.get("/:loanId", protect, getLoanDetails); // Route to get loan details by loan ID

export default router;
