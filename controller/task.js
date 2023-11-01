const createTask = (req, res) => {
  res.status(200).json({ msg: "Creating Task" });
};
const getAllTask = (req, res) => {
  const task = [
    {
      _id: 1,
      title: "Nischal",
      description: "asdfans",
      color: "red",
    },
    {
      _id: 2,
      title: "Nischal2",
      description: "asdfans",
      color: "red",
    },
  ];

  res.status(200).json({ tasks: task });
};
const getTask = (req, res) => {
  const { id } = req.params;
  res.json({ id: id });
};
const deleteTask = (req, res) => {
  res.send("Deleting the task");
};
const updateTask = (req, res) => {
  res.send("Updating the task");
};

module.exports = { createTask, getTask, getAllTask, deleteTask, updateTask };
