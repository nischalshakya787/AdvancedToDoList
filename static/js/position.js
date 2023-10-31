document.addEventListener("DOMContentLoaded", function () {
  const floater = document.querySelector(".floater");
  let activeElement = null;

  document.addEventListener("click", function (e) {
    const element = e.target;

    if (activeElement) {
      activeElement.classList.remove("col-active");
    }
    if (element.classList.contains("trigger")) {
      const x = element.offsetLeft;
      let offset = 0;
      x <= 459 ? (offset = x + 145) : (offset = x - 400);
      offset = offset + "px"; // Turning it into a string
      floater.style.display = "block";
      floater.style.left = offset;
      // Add the "col-active" class to the clicked element
      element.classList.add("col-active");

      // Update the active element
      activeElement = element;
    }
  });
});
