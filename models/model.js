const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Error: Task field cannot be Empty"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Error: Description field cannot be Empty"],
  },
  date: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("tododb", toDoSchema);
