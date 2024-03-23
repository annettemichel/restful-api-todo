const request = require('supertest');
const app = require('../index');

describe("Test der Todo Endpunkte", () => {
    console.log(process.env.NODE_ENV);

    it("Rückgabe aller vorhandenen Todos", async () => {
        const res = await request(app)
            .get('/api/todos')
        expect(res.status).toBe(200)
    })

    it("Erstellen eines Todos", async () => {
        const res = await request(app)
            .post('/api/todos')
            .send({
                title: 'Test Todo',
                description: 'Dies ist ein Test',
                completed: 0,
            })
        expect(res.status).toBe(201)

    });

    it("Rückgabe eines Todos", async () => {
        const res = await request(app)
            .get('/api/todos/1')
            .send({
                id: 1
            })
        expect(res.status).toBe(200)

    })


    it("Aktualisieren eines Todos", async () => {
        let res = await request(app)
            .post('/api/todos')
            .send({
                title: 'Ursprüngliches Todo',
                description: 'Dies ist ein Test',
                completed: 0,
            });

        const todoId = res.body.id;
        res = await request(app)
            .patch(`/api/todos/${todoId}`)
            .send({
                title: 'Aktualisiertes Todo',
                description: 'Dies ist ein aktualisierter Test',
                completed: 1,
            });

        expect(res.status).toBe(200);
        expect(res.body.title).toBe('Aktualisiertes Todo');

    });

    it("Löschen eines Todos", async () => {
        let res = await request(app)
            .post('/api/todos')
            .send({
                title: 'Todo zum löschen',
                description: 'Dieses Todo wird gelöscht',
                completed: 0,
            });

        const todoId = res.body.id;
        res = await request(app)
            .delete(`/api/todos/${todoId}`);

        expect(res.status).toBe(204);

        res = await request(app)
            .get(`/api/todos/${todoId}`);
        expect(res.status).toBe(404);
    });

    it("Abfrage einer unbekannten ID", async () => {
        const res = await request(app)
            .get('/api/todos/100')
            .send({
                userId: 100
            })
        expect(res.status).toBe(404)
    })
});
