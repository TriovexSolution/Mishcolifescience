// middleware/validateContact.js
import { body, validationResult } from "express-validator";

export const validateContact = [
  body("fullName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Full name must be 2–50 characters")
    .escape(),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("queryType")
    .isIn([
      "General Inquiry",
      "Technical Support",
      "Partnership",
      "Feedback",
      "Other",
    ])
    .withMessage("Please select a valid query type"),

  body("message")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Message must be 10–1000 characters")
    .escape(),

  // Final handler to check results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }
    next();
  },
];