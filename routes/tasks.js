const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controller/task");

router.route("/").get(getAllTask).post(createTask);
router.route("/:id").patch(updateTask).get(getTask).delete(deleteTask);

module.exports = router;
