const formDOM = document.querySelector(".task-form");
const loadingDOM = document.querySelector(".loading-text");
const taskField = document.querySelector(".tasks");
const titleDOM = document.querySelector("#inputTaskTitle");
const descriptionDOM = document.querySelector("#inputTaskDescription");
const colorDOM = document.querySelector("#colorSelection");
const dateDOM = document.getElementById("displayDate");
const filterBtn = document.querySelectorAll(".filterBtn");

const showTask = async (filterElement) => {
  //filterElement is the button. From this button we will get the value which will determine the data to be filtered.
  loadingDOM.style.display = "block";
  filterBtn.forEach((element) => {
    // This will remove all the active class from 3 buttons
    element.classList.remove("active");
  });

  try {
    let todo;
    if (filterElement.value === "all") {
      const response = await axios.get("/api/tasks/all"); //api/tasks/:method
      filterElement.classList.add("active");
      todo = response.data.todo;
    } else if (filterElement.value === "pending") {
      const response = await axios.get("/api/tasks/pending"); //api/tasks/:method
      filterElement.classList.add("active");
      todo = response.data.todo;
    } else {
      const response = await axios.get("/api/tasks/completed"); //api/tasks/:method
      filterElement.classList.add("active");
      todo = response.data.todo;
    }
    todo.sort((a, b) => new Date(a.date) - new Date(b.date)); //This will sort the date in ascending order
    if (todo.length < 1) {
      loadingDOM.style.display = "none";
      taskField.innerHTML = `<span>You have no Tasks</span>`;
      return;
    }
    console.log(todo);
    const allTasks = todo
      .map((task) => {
        const { _id, title, description, color } = task;
        return `<a href="view?id=${_id}" class="titleTODO"><span class="colorPalete" style="background:${color};"></span> &nbsp;${title}</a>`;
      })
      .join("");
    taskField.innerHTML = allTasks;
    loadingDOM.style.display = "none";
  } catch (error) {
    console.log(error);
    taskField.innerHTML = `<span>Error on Fetching the Data</span>`;
  }
  loadingDOM.style.display = "none";
};

showTask(filterBtn[0]);

filterBtn.forEach((filterElement) => {
  filterElement.addEventListener("click", () => {
    showTask(filterElement);
  });
});

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
