import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";

const LoanDetails = () => {
  const { loanId } = useParams(); // Get loanId from URL parameters
  const [loan, setLoan] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/loans/${loanId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLoan(response.data.loan);
      } catch (err) {
        setError("Error fetching loan details");
      }
    };

    fetchLoanDetails();
  }, [loanId]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div>
      <h2>Loan Details</h2>
      {loan ? (
        <div>
          <p><strong>Loan ID:</strong> {loan.id}</p>
          <p><strong>Loan Amount:</strong> ${loan.loanAmount}</p>
          <p><strong>Loan Term:</strong> {loan.loanTerm} months</p>
          <p><strong>Monthly Payment:</strong> ${loan.loanDetails.monthlyPayment}</p>
          <p><strong>Total Repayment:</strong> ${loan.loanDetails.totalRepayment}</p>
          <p><strong>Interest Rate:</strong> {loan.loanDetails.interestRate}%</p>
        </div>
      ) : (
        <p>Loading loan details...</p>
      )}
    </div>
  );
};

export default LoanDetails;
