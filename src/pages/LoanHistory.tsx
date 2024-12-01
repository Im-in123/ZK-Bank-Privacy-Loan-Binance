import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import Loader from '../components/Loader';

const LoanHistory = () => {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLoanHistory = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/loans/history`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're using JWT
          },
        });
        setLoans(response.data.loans);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching loan history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoanHistory();
  }, []);

  return (
    <div className="loan-history-container">
      {isLoading && <Loader />}
      {error && <p className="error-message">{error}</p>}
      <h2>Loan History</h2>
      {loans.length === 0 ? (
        <p>No loan history found</p>
      ) : (
        <ul>
          {loans.map((loan) => (
            <li key={loan.id}>
              <div>
                <strong>Loan Amount:</strong> {loan.loanAmount}
              </div>
              <div>
                <strong>Loan Term:</strong> {loan.loanTerm} months
              </div>
              <div>
                <strong>Status:</strong> {loan.loanStatus || 'Pending'}
              </div>
              <div>
                <strong>Total Repayment:</strong> {loan.loanDetails.totalRepayment}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LoanHistory;
