const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');
const todosRoutes = require('./routes/todosRoutes');
const {notFound, errorHandler} = require('./middlewares/errorHandlers');
const swaggerDocument = YAML.load('openapi.yaml');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Dokumentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routen
app.use('/api/todos', todosRoutes);
app.get('/', (req, res) => res.send('Todo API ist erreichbar.'));

// Fehlerbehandlung
app.use(notFound);
app.use(errorHandler);

module.exports = app;
