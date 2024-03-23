const sqlite3 = require("sqlite3");
const path = require('path');

let dbPath = path.join(__dirname, '..', 'todo.db');

if (process.env.NODE_ENV === 'test') {
    dbPath = ':memory:';
}

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error: Das öffnen der Datenbank ist nicht möglich!', err.message);
    } else {
        console.log('Connected: Die SQLite Datenbank liegt hier:', dbPath);

        db.run(`CREATE TABLE IF NOT EXISTS todo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            completed INTEGER DEFAULT 0,
            date INTEGER
        )`, (err) => {
            if (err) {
                console.error('Error: Das Erstellen der Tabelle war nicht möglich', err.message);
            } else {
                if (dbPath !== ':memory:') {
                    var insert = "INSERT INTO todo (title, description, completed, date) VALUES (?,?,?,?)";
                    db.run(insert, ["Lesezeichen organisieren", "Die Browser-Lesezeichen müssen aufgeräumt und sortiert werden.", 0, Date.now()]);
                    db.run(insert, ["Digitale Dateien aufräumen", "Unnötige Dateien auf dem Computer oder Smartphone müssen gelöscht werden", 0, Date.now()]);
                }
            }
        });
    }
});

module.exports = db;
