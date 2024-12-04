const LoanModel = require("../models/LoanModel");

// Create a loan
const createLoan = async (req, res) => {
  const { loanAmount, loanTerm, monthlyPayment, totalRepayment, interestRate } = req.body;
  const userId = req.userId;

  if (!loanAmount || !loanTerm) {
    return res.status(400).json({ message: "Loan amount and term are required" });
  }

  try {
    const loan = new LoanModel({
      userId,
      loanAmount,
      loanTerm,
      loanDetails: {
        monthlyPayment,
        totalRepayment,
        interestRate,
      },
    });

    await loan.save();
    res.status(201).json({ message: "Loan created successfully", loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch loans for the logged-in user
const getUserLoans = async (req, res) => {
  const userId = req.userId;

  try {
    const loans = await LoanModel.find({ userId });
    res.status(200).json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Approve a loan (admin-only functionality)
const approveLoan = async (req, res) => {
  const { loanId, approvedAmount } = req.body;

  if (!loanId || !approvedAmount) {
    return res.status(400).json({ message: "Loan ID and approved amount are required" });
  }

  try {
    const loan = await LoanModel.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    loan.approvedAmount = approvedAmount;
    await loan.save();

    res.status(200).json({ message: "Loan approved successfully", loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

 

module.exports = {
  createLoan,
  getUserLoans,
  approveLoan
};
