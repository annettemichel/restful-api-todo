class TodoController {
    constructor(todoModel) {
        this.Todo = todoModel;
    }

    async getAllTodos(req, res) {
        try {
            const todos = await this.Todo.findAll();
            if (todos.length === 0) {
                res.status(200).json({message: "Keine Todos vorhanden.", todos: []});
            } else {
                res.status(200).json(todos);
            }
        } catch (err) {
            res.status(500).json({message: "Fehler beim Abrufen der Todos.", error: err.message});
        }
    }

    async getTodoById(req, res) {
        try {
            const todo = await this.Todo.findById(req.params.id);
            if (todo) {
                res.status(200).json(todo);
            } else {
                res.status(404).json({message: "Todo nicht gefunden."});
            }
        } catch (err) {
            res.status(500).json({message: "Fehler beim Abrufen des Todos.", error: err.message});
        }
    }

    async createTodo(req, res) {
        try {
            const {title, description} = req.body;
            if (!title) {
                return res.status(400).json({message: "Ein Titel ist erforderlich."});
            }
            const todo = await this.Todo.create({title, description});
            res.status(201).json(todo);
        } catch (err) {
            res.status(500).json({message: "Fehler beim Erstellen des Todos.", error: err.message});
        }
    }

    async updateTodo(req, res) {
        try {
            const {title, description, completed} = req.body;
            const updateData = await this.Todo.update(req.params.id, {title, description, completed});

            if (updateData) {
                res.status(200).json(updateData);
            } else {
                res.status(404).json({message: "Todo nicht gefunden."});
            }
        } catch (err) {
            res.status(500).json({message: "Fehler beim Aktualisieren des Todos.", error: err.message});
        }
    }

    async deleteTodo(req, res) {
        try {
            const deleteResult = await this.Todo.delete(req.params.id);
            if (deleteResult) {
                res.status(204).send();
            } else {
                res.status(404).json({message: "Todo nicht gefunden."});
            }
        } catch (err) {
            res.status(500).json({message: "Fehler beim Löschen des Todos.", error: err.message});
        }
    }
}

module.exports = TodoController;
