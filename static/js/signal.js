const formDOM = document.querySelector(".task-form");
const loadingDOM = document.querySelector(".loading-text");
const taskField = document.querySelector(".tasks");
const titleDOM = document.querySelector("#inputTaskTitle");
const descriptionDOM = document.querySelector("#inputTaskDescription");
const colorDOM = document.querySelector("#colorSelection");
const dateDOM = document.getElementById("displayDate");

const showTask = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { todo },
    } = await axios.get("/api/tasks");

    if (todo.length < 1) {
      loadingDOM.style.visibility = "hidden";
      taskField.innerHTML = `<span>You have no Tasks</span>`;
      return;
    }
    console.log(todo);
    const allTasks = todo
      .map((task) => {
        const { _id, title, description, color } = task;
        return `<a href="/api/tasks/${_id}" class="titleTODO"><span class="colorPalete" style="background:${color};"></span> &nbsp;${title}</a>`;
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

formDOM.addEventListener("submit", async (e) => {
  // e.preventDefault();
  const title = titleDOM.value;
  const description = descriptionDOM.value;
  const color = colorDOM.value;
  const date = dateDOM.innerText;

  const data = {
    title: title,
    description: description,
    color: color,
    date: date,
  };
  try {
    await axios.post("/api/tasks", data);
  } catch (error) {
    console.log(error);
  }
});
