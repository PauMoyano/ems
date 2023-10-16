"use strict";

const express = require('express');

const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "EMS Doc",
      description: "API documentation for use",
      servers: ["http:localhost:8080"]
    }
  },
  basePath: "/",
  apis: ["./routes/index.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/',swaggerUi.serve, swaggerUi.setup(swaggerDocs))