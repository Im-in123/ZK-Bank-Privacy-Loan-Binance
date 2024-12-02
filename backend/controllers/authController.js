// authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel.js');

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Signup logic
  const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            salt,
        });

        res.status(201).json({ message: 'User created successfully', userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login logic
  const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Find user by email
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '5h',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Logout logic
 const logout = (req, res) => {
    // Invalidate JWT or remove tokens from the client (e.g., clearing cookies)
    res.status(200).json({ message: 'Logout successful' });
};

/// Validate token logic
  const validateToken = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Fetch user data from the database using the decoded user ID
        const user = await UserModel.findOne({ where: { id: decoded.id } });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Return the user data
        res.json({ user });
    } catch (err) {
        return res.status(401).send({ message: 'Invalid or expired token' });
    }
};

module.exports = { signup, login, logout, validateToken };