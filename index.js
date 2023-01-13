const express = require("express");
const Cors = require("cors");
require("dotenv").config();
const TaskController = require("./src/Controllers/controller");
const app = express();

app.use(express.json());
app.use(Cors());
app.use("/tasks", TaskController);

module.exports = app;

const port = process.env.porta || 4000;

app.listen(port, () =>
  console.log(
    "SERVER OPEN PORT " + port + " Connected DATA-BASE to PlanetScale!"
  )
);
