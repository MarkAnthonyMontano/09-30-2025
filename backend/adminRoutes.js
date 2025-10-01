// Assuming you're using Express and MySQL

const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const router = express.Router();


// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user; // Attach user data to request object
        next();
    });
};

// Get logged-in user's profile
router.get('/profile', authenticateToken, (req, res) => {
    const userId = req.user.id; // User ID from JWT token

    const query = 'SELECT id, username, role FROM user_accounts WHERE id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).send('Database error');
        if (results.length === 0) return res.status(404).send('User not found');

        // Send back user profile (including role)
        const user = results[0];
        res.json({
            id: user.id,
            username: user.username,
            role: user.role,
        });
    });
});

module.exports = router;
