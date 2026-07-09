const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const { getalldata, gettask_id, post_task, update_task, delete_task } = require('../controller/task_controller.js');
const { body } = require('express-validator');

// GET all tasks
router.get('/', getalldata);

// GET single task by id
router.get('/:id', authMiddleware, gettask_id);

// POST create new task
router.post('/', authMiddleware, body("title").notEmpty().withMessage("title is required") ,post_task);

// PUT update task
router.put('/:id', authMiddleware, update_task);

// DELETE task
router.delete('/:id', authMiddleware, delete_task);

module.exports = router;
