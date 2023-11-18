const toDoModel = require("../models/model");

const createTask = async (req, res) => {
  try {
    const todo = await toDoModel.create(req.body);
    return res.status(201).json({ todo: todo });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
};

const getAllTask = async (req, res) => {
  try {
    const { method } = req.params;
    if (method === "all") {
      const AllTask = await toDoModel.find({});
      return res.status(200).json({ todo: AllTask });
    } else if (method === "pending") {
      const AllTask = await toDoModel.find({ status: false });
      return res.status(200).json({ todo: AllTask });
    } else {
      const AllTask = await toDoModel.find({ status: true });
      return res.status(200).json({ todo: AllTask });
    }
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: toDoId } = req.params;
    const Task = await toDoModel.find({ _id: toDoId });
    return res.status(200).json({ todo: Task });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: TaskID } = req.params;
    const updatedTask = await toDoModel.findOneAndUpdate(
      { _id: TaskID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({ todo: updatedTask });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: TaskID } = req.params;
    const delTask = await toDoModel.findOneAndDelete({ _id: TaskID });
    return res.status(200).json({ msg: "Successfully deleted" });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
};

module.exports = {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
};
