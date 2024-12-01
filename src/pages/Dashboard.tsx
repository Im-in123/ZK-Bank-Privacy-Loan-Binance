import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <h1>Welcome, {user ? user.username : 'Guest'}</h1>
      <Link to="/loan-history">View Loan History</Link>
    <Link to="/loan-request">Apply for a Loan</Link>
    </div>
  );
};

export default Dashboard;
