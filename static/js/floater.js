document.addEventListener("DOMContentLoaded", () => {
  const floater = document.querySelector(".floater"); //Targets the floater
  const closeButton = document.getElementById("close"); //Targets the close Button
  let activeElement = null;

  document.addEventListener("click", (e) => {
    const element = e.target; //This will give us the element that we clicked

    //Checking if activeElement exists or not if yes col-active class is removed
    if (activeElement) {
      activeElement.classList.remove("col-active");
    }
    //Checking if the element contains the trigger className
    if (element.classList.contains("trigger")) {
      const data = element.getAttribute("data-info"); //This is give us the data-info of the div element
      const displayDate = document.getElementById("displayDate"); //Targets where we will display the date

      displayDate.innerText = data; // Sets the date in the displayDate postition

      const x = element.offsetLeft; // Get the position X of the element
      let offset = 0;
      x <= 459 ? (offset = x + 145) : (offset = x - 400); //Condition for the offset
      offset = offset + "px"; // Turning it into a string

      floater.style.display = "block";
      floater.style.left = offset; //This will set the position of the floater

      // Add the "col-active" class to the clicked element
      element.classList.add("col-active");

      // Update the active element
      activeElement = element;
    }
  });
  closeButton.addEventListener("click", () => {
    floater.style.display = "none";
  });
});
