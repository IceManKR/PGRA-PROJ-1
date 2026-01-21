console.log('auth.routes.js loaded');

const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const authController = require('../controllers/auth.controller');
const validate =require('../middleware/validate.middleware');
const {registerValidator, loginValidator}= require('../validators/auth.validator');
const { authLimiter } = require('../middleware/rateLimiters');

router.post(
  '/register',
  authLimiter,
  registerValidator,
  validate,
  asyncHandler(authController.register)
);

router.post(
  '/login',
  authLimiter,
  loginValidator,
  validate,
  asyncHandler(authController.login)
);

module.exports = router;
