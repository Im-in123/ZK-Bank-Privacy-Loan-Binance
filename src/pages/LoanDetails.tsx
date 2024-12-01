import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LoanDetails = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/loans/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setLoan(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLoanDetails();
  }, [id]);

  if (!loan) return <p>Loading...</p>;

  return (
    <div>
      <h1>Loan Details</h1>
      <p>Amount: {loan.loanAmount}</p>
      <p>Status: {loan.loanStatus}</p>
      <p>Details: {loan.loanDetails}</p>
    </div>
  );
};

export default LoanDetails;
