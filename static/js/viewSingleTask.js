document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const dateDOM = document.querySelector("#displayDate");
  const titleDOM = document.querySelector("#inputTaskTitle");
  const descriptionDOM = document.querySelector("#inputTaskDescription");
  const colorDOM = document.querySelector("#colorSelection");
  const ringLoader = document.querySelector(".ringLoader");
  const containerDOM = document.querySelector("#editContainer");
  const statusBtn = document.getElementById("statusBtn");
  const editBtn = document.getElementById("editBtn");
  const deleteBtn = document.getElementById("deleteBtn");
  const formDOM = document.querySelector(".task-form");
  const editMsg = document.querySelector(".edit-message");

  const showSingleTask = async () => {
    ringLoader.style.display = "block";

    try {
      const {
        data: { todo },
      } = await axios.get(`api/tasks/${id}`);
      ringLoader.style.display = "none";
      todo.map((task) => {
        const { _id, title, date, description, color } = task;
        dateDOM.value = date;
        titleDOM.value = title;
        descriptionDOM.value = description;
        colorDOM.value = color;
      });
      containerDOM.style.display = "block";

      console.log(todo);
    } catch (error) {
      console.log(error);
    }
  };

  showSingleTask();

  editBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      const utitle = titleDOM.value;
      const udescription = descriptionDOM.value;
      const ucolor = colorDOM.value;
      const udate = dateDOM.value;
      await axios.patch(`api/tasks/${id}`, {
        title: utitle,
        description: udescription,
        date: udate,
        color: ucolor,
      });
      editMsg.style.display = "block";
      setTimeout(() => {
        editMsg.style.display = "none";
      }, 6000);
    } catch (error) {
      console.log(error);
    }
  });
  deleteBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`api/tasks/${id}`);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  });
});
