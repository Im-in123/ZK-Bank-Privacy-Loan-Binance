import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const LoanDetails = () => {
  const { id } = useParams(); // 'id' must match ':id' in the route
  const [loan, setLoan] = useState(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/loans/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setLoan(response.data.loan); // Ensure API response matches structure
      } catch (err) {
        console.error('Error fetching loan details:', err);
      }
    };

    fetchLoanDetails();
  }, [id]);

  if (!loan) return <p>Loading...</p>;

  return (
    <div className="loan-details-container">
      <h1>Loan Details</h1>
    
      
      <div className="loan-detail">
        <strong>Loan Amount:</strong> ${loan.loanAmount.toFixed(2)}
      </div>
      <div className="loan-detail">
        <strong>Loan Term:</strong> {loan.loanTerm} months
      </div>
      <div className="loan-detail">
        <strong>Loan Status:</strong> {loan.loanStatus}
      </div>
      <div className="loan-detail">
        <strong>Approved Amount:</strong> ${loan.approvedAmount.toFixed(2)}
      </div>
      <div className="loan-detail">
        <strong>Created At:</strong> {new Date(loan.createdAt).toLocaleString()}
      </div>
      <div className="loan-detail">
        <strong>Updated At:</strong> {new Date(loan.updatedAt).toLocaleString()}
      </div>
      <div className="loan-detail">
        <strong>Loan Details:</strong>
        <ul>
          <li>
            <strong>Monthly Payment:</strong> ${loan.loanDetails.monthlyPayment.toFixed(2)}
          </li>
          <li>
            <strong>Total Repayment:</strong> ${loan.loanDetails.totalRepayment.toFixed(2)}
          </li>
          <li>
            <strong>Interest Rate:</strong> {loan.loanDetails.interestRate}%
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoanDetails;
