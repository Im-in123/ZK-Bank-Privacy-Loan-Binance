import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <h1>Welcome, {user ? user.username : 'Guest'}</h1>
      {/* Render other user details */}
    </div>
  );
};

export default Dashboard;
