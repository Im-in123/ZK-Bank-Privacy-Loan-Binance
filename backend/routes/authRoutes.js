// authRoutes.js
import express from 'express';
import { signup, login, logout, validateToken } from '../controllers/authController.js';

const authRouter = express.Router();

// Route for signing up a new user
authRouter.post('/signup', signup);

// Route for logging in
authRouter.post('/login', login);

// Route for logging out
authRouter.post('/logout', logout);

// Route for token validation
authRouter.get('/validate-token', validateToken);

export default authRouter;
