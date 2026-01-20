const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const taskController = require('../controllers/task.controller');

router.use(auth);

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
