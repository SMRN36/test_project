const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get all todos
router.get('/', todoController.getAllTodos);

// Add a todo
router.post('/', todoController.addTodo);

// Delete a todo
router.delete('/todos/:id', todoController.deleteTodo);

// Update a todo
router.put('/todos/:id', todoController.updateTodo);

module.exports = router;

