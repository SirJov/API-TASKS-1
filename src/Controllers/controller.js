const express = require("express");
const router = express.Router();
const TasksHandler = require("../Core/TasksHandler");
const handler = new TasksHandler();
const midlleware = require("../Middlewares/middlewares");

router.post("/criar", async (req, res) => {
  try {
    const task = await handler.gravar(req);
    if (task) return res.status(200).send(task);
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(404).json(JSON.stringify(error));
  }
});

router.get("/listar", async (req, res) => {
  try {
    const task = await handler.buscar();
    if (task) return res.status(200).send(task);
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(404).json(JSON.stringify(error));
  }
});

router.delete("/deletar/:id", midlleware.validateId, async (req, res) => {
  try {
    const task = await handler.deletar(req);
    if (task) return res.status(200).send(task);
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(404).json(JSON.stringify(error));
  }
});

router.put("/atualizar/:id", midlleware.validateId, async (req, res) => {
  try {
    const task = await handler.atualizar(req);
    if (task) return res.status(200).send(task);
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(404).json(JSON.stringify(error));
  }
});

router.get("/listarId/:id", midlleware.validateId, async (req, res) => {
  try {
    const task = await handler.buscarId(req);
    if (task) return res.status(200).send(task);
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(404).json(JSON.stringify(error));
  }
});

router.get("/listarBody", midlleware.validateBody, async (req, res) => {
  try {
    const task = await handler.buscarBody(req);
    if (task) return res.status(200).send(task);
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(404).json(JSON.stringify(error));
  }
});

module.exports = router;
