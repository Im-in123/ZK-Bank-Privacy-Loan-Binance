import express from 'express';
import { createServer } from '@vercel/node';
import authRoutes from '../routes/authRoutes'; // Adjust to your file paths
import loanRoutes from '../routes/loanRoutes';  // Adjust to your file paths

const app = express();

app.use(express.json());
app.use('/auth', authRoutes); // Use your auth routes
app.use('/loans', loanRoutes); // Use your loan routes

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ZK-Bank Privacy Loan API!',
    availableEndpoints: ['/auth', '/loans'],
  });
});

export default createServer(app); // Export for serverless
