const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js'); // Ou exporte o JSON/YAML diretamente
const express = require('express');
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(3000, () => console.log('Swagger UI disponível em http://localhost:3333/api-docs'));