const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controller/todos");

router.route("/").post(createTask).get(getAllTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
