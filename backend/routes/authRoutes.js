// authRoutes.js
import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Route for signing up a new user
router.post('/signup', signup);

// Route for logging in
router.post('/login', login);

// Route for logging out
router.post('/logout', logout);

export default router;
