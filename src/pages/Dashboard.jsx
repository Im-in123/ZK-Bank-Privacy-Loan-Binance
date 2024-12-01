import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <Link to="/history">View Loan History</Link>
    <Link to="/apply">Apply for a Loan</Link>
  </div>
);

export default Dashboard;
