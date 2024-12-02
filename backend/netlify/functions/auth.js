// netlify/functions/auth.js
const express = require('express');
const app = express();
app.use(express.json());

// Import the necessary controller functions here:
const { signup, login, logout, validateToken } = require('../../controllers/authController');

// Auth routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/logout', logout);
app.get('/validate-token', validateToken);

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
