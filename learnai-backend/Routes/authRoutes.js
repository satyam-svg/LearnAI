const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// Custom validation middleware for signup
const validateSignup = [
  body('fullName')
    .notEmpty().withMessage('Full name is required'),
  body('pin')
    .isLength({ min: 4, max: 4 }).withMessage('PIN must be exactly 4 digits')
    .isNumeric().withMessage('PIN must contain only numbers'),
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format'),
  body('phoneNumber')
    .optional()
    .matches(/^\+?\d{10,15}$/).withMessage('Invalid phone number format'),
  body('dob')
    .optional()
    .isISO8601().withMessage('Date of birth must be a valid date'),
  // If there are more rules, add them here
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Define routes
router.post('/login', authController.login);
router.post('/signup', validateSignup, authController.signup);

module.exports = router;
