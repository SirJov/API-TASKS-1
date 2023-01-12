const express = require("express");
const router = express.Router();

router.get("/listarId/:id", async (req, res) => {
  try {
    const task = await handler.buscarId(req);
    if (task) return res.status(200).send(task);
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(404).json(JSON.stringify(error));
  }
});

module.exports = router;
