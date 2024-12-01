// authRoutes.js
import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';

const authRouter = express.Router();

// Route for signing up a new user
authRouter.post('/signup', signup);

// Route for logging in
authRouter.post('/login', login);

// Route for logging out
authRouter.post('/logout', logout);

export default authRouter;
