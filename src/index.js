const express = require("express");
const Cors = require("cors");
require("dotenv").config();
const TaskController = require("./Controllers/controller");
const app = express();

app.use(express.json());
app.use(Cors());
app.use("/api/tasks/", TaskController);

module.exports = app;

const port = process.env.porta || 3030;

app.listen(port, () => console.log("servidor rodando na porta " + port));
