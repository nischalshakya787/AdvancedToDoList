const express = require("express");
const app = express();

const tasks = require("./routes/tasks");

app.use(express.static("./static"));
app.use("/api/tasks", tasks);

app.listen(8000, () => {
  console.log("Server is running on port : 8000...");
});
