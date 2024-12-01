"use strict";

const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");

const app = express();

// conect database
async function connectDatabase() {
  try {
    await mongoose.connect(process.env.CONECTION_MONGODB);
    console.log(`${new Date()} - Conected database!`);
  } catch (error) {
    console.log(`${new Date()} - (error) ${error}`);
  }
}
connectDatabase();

// loading models
const User = require("./models/user");

// routers
const indexRoute = require("./routes/index-route");
const authRoute = require("./routes/auth-route");

// data conversion middleware
app.use(express.json());

// settings CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// documentation settings
//const swaggerFile = require("./docs/swagger_output.json");

// application routes
app.use("/", indexRoute);
app.use("/auth", authRoute);

//app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
