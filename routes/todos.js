const express = require("express");
const router = express.Router();
const path = require("path");
const {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controller/todos");

router.route("/").post(createTask);
router.route("/:method").get(getAllTask);
router.route("/v1/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
