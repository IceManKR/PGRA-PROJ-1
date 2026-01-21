const {body} = require('express-validator');

exports.registerValidator=[
    body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid Email is required'),

    body('password')
    .isLength({min:6})
    .trim()
    .withMessage('Password must be at least 6 characters long')
];
 
exports.loginValidator=[
    body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid Email is required'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
    
];