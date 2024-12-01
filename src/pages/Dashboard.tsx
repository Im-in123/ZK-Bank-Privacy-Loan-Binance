
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h1>Welcome, {user ? user.username : 'Guest'}!</h1>
        <p>
          This application empowers Binance users to apply for privacy-preserving loans. Using advanced 
          <strong> zkProofs</strong>, we verify your creditworthiness without exposing your personal financial data. 
          Join us in redefining secure and private financial transactions!
        </p>
      </div>

      <div className="action-links">
        <Link to="/loan-history" className="dashboard-link">
          View Loan History
        </Link>
        <Link to="/loan-request" className="dashboard-link">
          Apply for a Loan
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
