// netlify/functions/loan.js
const express = require('express');
const app = express();
app.use(express.json());

// Import the loan controller functions:
const { requestLoan, getLoanHistory, getLoanDetails } = require('../../controllers/loanController');

// Protect middleware (if you have authentication):
const { protect } = require('../../middleware/authMiddleware');

app.post('/request', protect, requestLoan);
app.get('/history', protect, getLoanHistory);
app.get('/:loanId', protect, getLoanDetails);

exports.handler = async (event, context) => {
    return new Promise((resolve, reject) => {
        app(event, context, (response) => {
            resolve({
                statusCode: 200,
                body: JSON.stringify(response),
            });
        });
    });
};
