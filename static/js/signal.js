const formDOM = document.querySelector(".task-form");
const loadingDOM = document.querySelector(".loading-text");
const taskField = document.querySelector(".tasks");
const title = document.querySelector("#inputTaskTitle");
const description = document.querySelector("#inputTaskDescription");
const color = document.querySelector("#colorSelection");

const showTask = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { tasks },
    } = await axios.get("/api/tasks");

    if (tasks.length < 1) {
      taskField.innerHTML = `<span>You have no Tasks</span>`;
      return;
    }
    console.log(tasks);
    const allTasks = tasks
      .map((task) => {
        const { _id, title, description, color } = task;
        return `<p>${title}${description}${color}</p>`;
      })
      .join("");
    taskField.innerHTML = allTasks;
    loadingDOM.style.visibility = "hidden";
  } catch (error) {
    console.log(error);
    taskField.innerHTML = `<span>Error on Fetching the Data</span>`;
  }
  loadingDOM.style.visibility = "hidden";
};

showTask();
