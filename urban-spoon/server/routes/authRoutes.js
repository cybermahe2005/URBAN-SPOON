const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { loginAdmin, getAdminProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');

// Login Route
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
    validate,
  ],
  loginAdmin
);

// Get current profile
router.get('/profile', protect, getAdminProfile);

module.exports = router;
