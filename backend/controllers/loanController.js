// controllers/loanController.js
import LoanModel from "../models/LoanModel.js";
import UserModel from "../models/UserModel.js"; // Import user model for referencing

// Request a new loan
const requestLoan = async (req, res) => {
  console.log("Requesting loan")
  const { loanAmount, loanTerm } = req.body;
  const userId = req.userId; // Assuming the user ID is available in the request

  try {
    // Create loan details (you can adjust calculations as needed)
    const loanDetails = {
      monthlyPayment: (loanAmount * 0.05) / 12, // Simple calculation for monthly payment
      totalRepayment: loanAmount + loanAmount * 0.05, // Total repayment = loan amount + 5% interest
      interestRate: 5, // Default interest rate
    };

    const loan = await LoanModel.create({
      userId,
      loanAmount,
      loanTerm,
      loanDetails,
      approvedAmount: loanAmount
    });

    res.status(201).json({
      message: "Loan request created successfully",
      loan,
    });
  } catch (err) {
    console.log("error:", err)
    res.status(500).json({
      message: "Error creating loan request",
      error: err.message,
    });
  }
};

// Get the loan history for a user
const getLoanHistory = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({
      message: "User ID not found",
    });
  }

  try {
    const loans = await LoanModel.findAll({
      where: { userId },
    });
    res.status(200).json({
      loans,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      message: "Error fetching loan history",
      error: err.message,
    });
  }
};


// Get loan details by loan ID
const getLoanDetails = async (req, res) => {
  const { loanId } = req.params;
console.log("loan id::",loanId )
  try {
    const loan = await LoanModel.findByPk(loanId);
    if (!loan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    res.status(200).json({
      loan,
    });
  } catch (err) {
    console.log("error:", err)
    res.status(500).json({
      message: "Error fetching loan details",
      error: err.message,
    });
  }
};

export { requestLoan, getLoanHistory, getLoanDetails };
