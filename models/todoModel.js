const db = require('../config/database');

class Todo {
    constructor(id, title, description, completed, date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.date = date;
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM todo ORDER BY completed, date DESC';
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const todos = rows.map(row => new Todo(row.id, row.title, row.description, row.completed, row.date));
                    resolve(todos);
                }
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM todo WHERE id = ?';
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    if (row) {
                        resolve(new Todo(row.id, row.title, row.description, row.completed, row.date));
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    static create({title, description}) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO todo (title, description, completed, date) VALUES (?, ?, ?, ?)';
            const now = Date.now();
            db.run(sql, [title, description, 0, now], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Todo(this.lastID, title, description, 0, now));
                }
            });
        });
    }

    static update(id, {title, description, completed}) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE todo SET title = ?, description = ?, completed = ?, date = ? WHERE id = ?';
            db.run(sql, [title, description, completed, Date.now(), id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Todo(id, title, description, completed, Date.now()));
                }
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM todo WHERE id = ?';
            db.run(sql, [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
}

module.exports = Todo;
