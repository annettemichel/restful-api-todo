const express = require('express');
const TodosController = require('../controllers/todosController');
const todoModel = require('../models/todoModel');

const router = express.Router();
const todosController = new TodosController(todoModel);

// Alle To-Dos abrufen
router.get('/', (req, res) => todosController.getAllTodos(req, res));

// Ein To-Do nach ID abrufen
router.get('/:id', (req, res) => todosController.getTodoById(req, res));

// Neues To-Do erstellen
router.post('/', (req, res) => todosController.createTodo(req, res));

// To-Do aktualisieren
router.patch('/:id', (req, res) => todosController.updateTodo(req, res));

// To-Do löschen
router.delete('/:id', (req, res) => todosController.deleteTodo(req, res));

module.exports = router;
