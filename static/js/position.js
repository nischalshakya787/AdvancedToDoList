document.addEventListener("DOMContentLoaded", function () {
  const dateDiv = document.querySelectorAll(".trigger");
  const floater = document.querySelector(".floater");

  dateDiv.forEach((item) => {
    item.addEventListener("click", (e) => {
      // if (element.classList.contains("col-active")) {
      //   element.classList.remove("col-active");
      // }
      const element = e.target;
      const x = element.offsetLeft;
      let offset = 0;
      x <= 459 ? (offset = x + 145) : (offset = x - 400);
      offset = offset + "px"; //Turning it into a string
      floater.style.display = "block";
      floater.style.left = offset;
      element.classList.add("col-active");
    });
  });
});
