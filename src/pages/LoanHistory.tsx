import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoanHistory = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/loans', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setLoans(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div>
      <h1>Loan History</h1>
      {loans.map((loan) => (
        <div key={loan.id}>
          <h2>{loan.loanAmount}</h2>
          <p>Status: {loan.loanStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default LoanHistory;
