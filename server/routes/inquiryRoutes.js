const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createInquiry,
  getAllInquiries,
  getInquiryStats,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');

// Validation rules for inquiry creation
const inquiryValidationRules = [
  body('customerName')
    .trim()
    .notEmpty()
    .withMessage('Customer name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Customer name must be between 2 and 100 characters'),
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[+0-9()\s.-]{7,25}$/)
    .withMessage('Please enter a valid phone number (e.g. +1 555-123-4567 or 9876543210)'),
  body('bookingDate')
    .notEmpty()
    .withMessage('Booking date and time are required')
    .isISO8601()
    .withMessage('Booking date must be a valid ISO date/time'),
  body('numberOfGuests')
    .notEmpty()
    .withMessage('Number of guests is required')
    .isInt({ min: 1, max: 50 })
    .withMessage('Number of guests must be a whole number between 1 and 50'),
  body('specialRequests')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Special requests cannot exceed 500 characters'),
];

// Public Route: Submit Inquiry
router.post('/', inquiryValidationRules, validate, createInquiry);

// Protected Admin Routes
router.get('/', protect, getAllInquiries);
router.get('/stats/summary', protect, getInquiryStats);
router.get('/:id', protect, getInquiryById);
router.patch('/:id/status', protect, updateInquiryStatus);
router.delete('/:id', protect, deleteInquiry);

module.exports = router;
