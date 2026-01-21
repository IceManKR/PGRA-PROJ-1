console.log('TASK ROUTES FILE LOADED');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');
const asyncHandler =  require('../utils/asyncHandler');
const taskController = require('../controllers/task.controller');
const { readLimiter, writeLimiter } = require('../middleware/rateLimiters');


router.use(auth);
// Read
router.get(
  '/',
  readLimiter,
  asyncHandler(taskController.getTasks)
);

// Write
router.post(
  '/',
  writeLimiter,
  asyncHandler(taskController.createTask)
);

// Admin write
router.delete(
  '/admin/purge',
  writeLimiter,
  authorize('admin'),
  asyncHandler(async (req, res) => {
    res.json({ message: 'Admin task executed' });
  })
);

// Delete by id
router.delete(
  '/:id',
  writeLimiter,
  asyncHandler(taskController.deleteTask)
);

module.exports = router;
