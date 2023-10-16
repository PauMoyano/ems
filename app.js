const dbSetup = require('./db/db-setup');
const express = require('express');
const router = require('./routes');

dbSetup();

const app = express();
app.use(express.json());
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
  info: {
    title: 'EMS docs',
    version: '1.0.0',
  },
  },
  apis: ["./routes/index.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/',swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use(router);

app.listen(8080, () => console.log('server running on port 8080'));