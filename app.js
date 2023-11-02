const express = require("express");
const app = express();
const todo = require("./routes/todos");
const connectDB = require("./db/connect");
require("dotenv").config(); //We can access the variable of .env file in this file
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Connected To DB");

    app.use(express.static("./static"));
    app.use("/api/tasks", todo);

    app.listen(8000, () => {
      console.log("Server is running on port : 8000...");
    });
  } catch (error) {
    app.get("/", (req, res) => {
      res.send("<h1>Failed Connecting to Database</h1>");
    });
    console.log(error);
    app.listen(8000, () => {
      console.log("Server is running on port : 8000...");
    });
  }
};
startServer();
