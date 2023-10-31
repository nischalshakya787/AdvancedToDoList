document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.getElementById("calendar-body");
  const currentMonthYear = document.getElementById("current-month-year");
  const prevMonthButton = document.getElementById("prev-month");
  const nextMonthButton = document.getElementById("next-month");
  const todayButton = document.getElementById("todayButton");
  const Days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  function updateCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    let month = new Date(null, currentMonth).toLocaleString("en-US", {
      month: "long",
    });
    let year = currentYear;
    currentMonthYear.innerText = `${month} ${year}`;

    let calendarHTML = "";
    let dayCounter = 1;
    let nextMonthDayCounter = 1;
    let prevMonthDay =
      new Date(currentYear, currentMonth, 0).getDate() - // This will get the last day of the month
      new Date(currentYear, currentMonth, 0).getDay(); //This will get the day of the last month
    let trackDay = 0;
    for (let i = 0; i < 6; i++) {
      let row = '<div class="row text-center rowBorder">';

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfWeek) {
          //For previous month ending dates
          row += `<div class="col columnBorder anotherCalendarColor"><p class="days">${Days[trackDay]}</p>${prevMonthDay}</div>`;
          trackDay++;
          prevMonthDay++;
        } else if (dayCounter <= daysInMonth) {
          //For actual date
          if (i == 0) {
            row += `<div class="col columnBorder"><p class="days">${Days[trackDay]}</p>${dayCounter}</div>`;
            trackDay++;
            dayCounter++;
          } else {
            row += `<div class="col columnBorder ">${dayCounter}</div>`;
            dayCounter++;
          }
        } else {
          //For next months initial date
          row += `<div class="col columnBorder anotherCalendarColor">${nextMonthDayCounter}</div>`;
          nextMonthDayCounter++;
        }
      }

      row += "</div>";
      calendarHTML += row;
    }

    calendarBody.innerHTML = calendarHTML;
  }

  prevMonthButton.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateCalendar();
  });

  nextMonthButton.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateCalendar();
  });
  todayButton.addEventListener("click", () => {
    currentDate = new Date();
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();
    updateCalendar();
  });

  updateCalendar();
});