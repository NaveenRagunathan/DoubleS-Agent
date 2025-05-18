const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token.' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

// Get profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, name, avatar_url FROM users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile.' });
  }
});

// Update profile (name/avatar)
router.put('/profile', authMiddleware, async (req, res) => {
  const { name, avatar_url } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, avatar_url = $2 WHERE id = $3 RETURNING id, email, name, avatar_url',
      [name, avatar_url, req.user.id]
    );
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile.' });
  }
});

module.exports = router;
